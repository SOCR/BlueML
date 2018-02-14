import { Component, ComponentFactoryResolver, ViewContainerRef, Input, ReflectiveInjector, ViewChild, Inject } from '@angular/core';
import { reflector } from '../private_import_core';
import { UIRouter } from "ui-router-core";
import { trace } from "ui-router-core";
import { Ng2ViewConfig } from "../statebuilders/views";
import { ResolveContext, NATIVE_INJECTOR_TOKEN } from "ui-router-core";
import { flattenR } from "ui-router-core";
import { MergeInjector } from "../mergeInjector";
/** @hidden */
var id = 0;
/**
 * Given a component class, gets the inputs of styles:
 *
 * - @Input('foo') _foo
 * - `inputs: ['foo']`
 *
 * @internalapi
 */
var ng2ComponentInputs = function (ng2CompClass) {
    /** Get "@Input('foo') _foo" inputs */
    var props = reflector.propMetadata(ng2CompClass);
    var _props = Object.keys(props || {})
        .map(function (key) { return ({ key: key, annoArr: props[key] }); })
        .reduce(function (acc, tuple) { return acc.concat(tuple.annoArr.map(function (anno) { return ({ key: tuple.key, anno: anno }); })); }, [])
        .filter(function (tuple) { return tuple.anno instanceof Input; })
        .map(function (tuple) { return ({ token: tuple.anno.bindingPropertyName || tuple.key, prop: tuple.key }); });
    /** Get "inputs: ['foo']" inputs */
    var inputs = reflector.annotations(ng2CompClass)
        .filter(function (x) { return x instanceof Component && !!x.inputs; })
        .map(function (x) { return x.inputs; })
        .reduce(flattenR, [])
        .map(function (input) { return ({ token: input, prop: input }); });
    return _props.concat(inputs);
};
/**
 * A UI-Router viewport directive, which is filled in by a view (component) on a state.
 *
 * ### Selector
 *
 * A `ui-view` directive can be created as an element: `<ui-view></ui-view>` or as an attribute: `<div ui-view></div>`.
 *
 * ### Purpose
 *
 * This directive is used in a Component template (or as the root component) to create a viewport.  The viewport
 * is filled in by a view (as defined by a [[Ng2ViewDeclaration]] inside a [[Ng2StateDeclaration]]) when the view's
 * state has been activated.
 *
 * #### Example:
 * ```js
 * // This app has two states, 'foo' and 'bar'
 * stateRegistry.register({ name: 'foo', url: '/foo', component: FooComponent });
 * stateRegistry.register({ name: 'bar', url: '/bar', component: BarComponent });
 * ```
 * ```html
 * <!-- This ui-view will be filled in by the foo state's component or
 *      the bar state's component when the foo or bar state is activated -->
 * <ui-view></ui-view>
 * ```
 *
 * ### Named ui-views
 *
 * A `ui-view` may optionally be given a name via the attribute value: `<div ui-view='header'></div>`.  *Note:
 * an unnamed `ui-view` is internally named `$default`*.   When a `ui-view` has a name, it will be filled in
 * by a matching named view.
 *
 * #### Example:
 * ```js
 * stateRegistry.register({
 *   name: 'foo',
 *   url: '/foo',
 *   views: { header: HeaderComponent, $default: FooComponent });
 * ```
 * ```html
 * <!-- When 'foo' state is active, filled by HeaderComponent -->
 * <div ui-view="header"></div>
 *
 * <!-- When 'foo' state is active, filled by FooComponent -->
 * <ui-view></ui-view>
 * ```
 */
export var UIView = (function () {
    function UIView(router, parent, viewContainerRef) {
        this.router = router;
        this.viewContainerRef = viewContainerRef;
        this.uiViewData = {};
        this.parent = parent;
    }
    Object.defineProperty(UIView.prototype, "_name", {
        set: function (val) { this.name = val; },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.ngOnInit = function () {
        var parentFqn = this.parent.fqn;
        var name = this.name || '$default';
        this.uiViewData = {
            $type: 'ng2',
            id: id++,
            name: name,
            fqn: parentFqn ? parentFqn + "." + name : name,
            creationContext: this.parent.context,
            configUpdated: this.viewConfigUpdated.bind(this),
            config: undefined
        };
        this.deregister = this.router.viewService.registerUIView(this.uiViewData);
    };
    UIView.prototype.disposeLast = function () {
        if (this.componentRef)
            this.componentRef.destroy();
        this.componentRef = null;
    };
    UIView.prototype.ngOnDestroy = function () {
        if (this.deregister)
            this.deregister();
        this.disposeLast();
    };
    /**
     * The view service is informing us of an updated ViewConfig
     * (usually because a transition activated some state and its views)
     */
    UIView.prototype.viewConfigUpdated = function (config) {
        // The config may be undefined if there is nothing currently targeting this UIView.
        // Dispose the current component, if there is one
        if (!config)
            return this.disposeLast();
        // Only care about Ng2 configs
        if (!(config instanceof Ng2ViewConfig))
            return;
        // The "new" viewconfig is already applied, so exit early
        if (this.uiViewData.config === config)
            return;
        // This is a new ViewConfig.  Dispose the previous component
        this.disposeLast();
        trace.traceUIViewConfigUpdated(this.uiViewData, config && config.viewDecl.$context);
        this.applyUpdatedConfig(config);
    };
    UIView.prototype.applyUpdatedConfig = function (config) {
        this.uiViewData.config = config;
        // Create the Injector for the routed component
        var context = new ResolveContext(config.path);
        var componentInjector = this.getComponentInjector(context);
        // Get the component class from the view declaration. TODO: allow promises?
        var componentClass = config.viewDecl.component;
        // Create the component
        var compFactoryResolver = componentInjector.get(ComponentFactoryResolver);
        var compFactory = compFactoryResolver.resolveComponentFactory(componentClass);
        this.componentRef = this.componentTarget.createComponent(compFactory, undefined, componentInjector);
        // Wire resolves to @Input()s
        this.applyInputBindings(this.componentRef, context, componentClass);
        // TODO: wire uiCanExit and uiOnParamsChanged callbacks
    };
    /**
     * Creates a new Injector for a routed component.
     *
     * Adds resolve values to the Injector
     * Adds providers from the NgModule for the state
     * Adds providers from the parent Component in the component tree
     * Adds a PARENT_INJECT view context object
     *
     * @returns an Injector
     */
    UIView.prototype.getComponentInjector = function (context) {
        // Map resolves to "useValue: providers"
        var resolvables = context.getTokens().map(function (token) { return context.getResolvable(token); }).filter(function (r) { return r.resolved; });
        var newProviders = resolvables.map(function (r) { return ({ provide: r.token, useValue: r.data }); });
        var parentInject = { context: this.uiViewData.config.viewDecl.$context, fqn: this.uiViewData.fqn };
        newProviders.push({ provide: UIView.PARENT_INJECT, useValue: parentInject });
        var parentComponentInjector = this.viewContainerRef.injector;
        var moduleInjector = context.getResolvable(NATIVE_INJECTOR_TOKEN).data;
        var mergedParentInjector = new MergeInjector(moduleInjector, parentComponentInjector);
        return ReflectiveInjector.resolveAndCreate(newProviders, mergedParentInjector);
    };
    /**
     * Supplies component inputs with resolve data
     *
     * Finds component inputs which match resolves (by name) and sets the input value
     * to the resolve data.
     */
    UIView.prototype.applyInputBindings = function (ref, context, componentClass) {
        var bindings = this.uiViewData.config.viewDecl['bindings'] || {};
        var addResolvable = function (tuple) { return ({
            prop: tuple.prop,
            resolvable: context.getResolvable(bindings[tuple.prop] || tuple.token)
        }); };
        // Supply resolve data to matching @Input('prop') or inputs: ['prop']
        var inputTuples = ng2ComponentInputs(componentClass);
        inputTuples.map(addResolvable)
            .filter(function (tuple) { return tuple.resolvable && tuple.resolvable.resolved; })
            .forEach(function (tuple) { ref.instance[tuple.prop] = tuple.resolvable.data; });
        // Initiate change detection for the newly created component
        ref.changeDetectorRef.detectChanges();
    };
    UIView.PARENT_INJECT = "UIView.PARENT_INJECT";
    UIView.decorators = [
        { type: Component, args: [{
                    selector: 'ui-view, [ui-view]',
                    template: "\n    <template #componentTarget></template>\n    <ng-content *ngIf=\"!componentRef\"></ng-content>\n  "
                },] },
    ];
    /** @nocollapse */
    UIView.ctorParameters = function () { return [
        { type: UIRouter, },
        { type: undefined, decorators: [{ type: Inject, args: [UIView.PARENT_INJECT,] },] },
        { type: ViewContainerRef, },
    ]; };
    UIView.propDecorators = {
        'componentTarget': [{ type: ViewChild, args: ['componentTarget', { read: ViewContainerRef },] },],
        'name': [{ type: Input, args: ['name',] },],
        '_name': [{ type: Input, args: ['ui-view',] },],
    };
    return UIView;
}());
//# sourceMappingURL=uiView.js.map