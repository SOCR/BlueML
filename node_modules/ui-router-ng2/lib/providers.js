import { Injector } from "@angular/core";
import { UIRouter, StateRegistry, StateService, TransitionService, UrlMatcherFactory, UrlRouter, ViewService, UrlService, UIRouterGlobals, services, Resolvable, NATIVE_INJECTOR_TOKEN } from "ui-router-core";
import { UIView } from "./directives/uiView";
import { ng2ViewsBuilder, Ng2ViewConfig } from "./statebuilders/views";
import { applyRootModuleConfig, applyModuleConfig } from "./uiRouterConfig";
import { UIROUTER_ROOT_MODULE, UIROUTER_MODULE_TOKEN } from "./uiRouterNgModule";
import { servicesPlugin } from "ui-router-core";
import { ng2LazyLoadBuilder } from "./statebuilders/lazyLoad";
import { UIRouterRx } from "ui-router-rx";
import { LocationStrategy, PlatformLocation } from "@angular/common";
import { Ng2LocationServices } from "./location/locationService";
import { Ng2LocationConfig } from "./location/locationConfig";
/**
 * This is a factory function for a UIRouter instance
 *
 * Creates a UIRouter instance and configures it for Angular 2, then invokes router bootstrap.
 * This function is used as an Angular 2 `useFactory` Provider.
 */
export function uiRouterFactory(locationStrategy, platformLocation, injector) {
    var rootModules = injector.get(UIROUTER_ROOT_MODULE);
    var modules = injector.get(UIROUTER_MODULE_TOKEN);
    if (rootModules.length !== 1) {
        throw new Error("Exactly one UIRouterModule.forRoot() should be in the bootstrapped app module's imports: []");
    }
    // ----------------- Create router -----------------
    // Create a new ng2 UIRouter and configure it for ng2
    var router = new UIRouter();
    // Add RxJS plugin
    router.plugin(UIRouterRx);
    // Add $q-like and $injector-like service APIs
    router.plugin(servicesPlugin);
    // ----------------- Monkey Patches ----------------
    // Monkey patch the services.$injector to use the root ng2 Injector
    services.$injector.get = injector.get.bind(injector);
    // ----------------- Configure for ng2 -------------
    router.locationService = new Ng2LocationServices(router, locationStrategy, platformLocation);
    router.locationConfig = new Ng2LocationConfig(router, locationStrategy, platformLocation);
    // Apply ng2 ui-view handling code
    var viewConfigFactory = function (path, config) { return new Ng2ViewConfig(path, config); };
    router.viewService._pluginapi._viewConfigFactory("ng2", viewConfigFactory);
    // Apply statebuilder decorator for ng2 NgModule registration
    var registry = router.stateRegistry;
    registry.decorator('views', ng2ViewsBuilder);
    registry.decorator('lazyLoad', ng2LazyLoadBuilder);
    // Prep the tree of NgModule by placing the root NgModule's Injector on the root state.
    var ng2InjectorResolvable = Resolvable.fromData(NATIVE_INJECTOR_TOKEN, injector);
    registry.root().resolvables.push(ng2InjectorResolvable);
    // Auto-flush the parameter type queue
    router.urlMatcherFactory.$get();
    // ----------------- Initialize router -------------
    setTimeout(function () {
        rootModules.forEach(function (moduleConfig) { return applyRootModuleConfig(router, injector, moduleConfig); });
        modules.forEach(function (moduleConfig) { return applyModuleConfig(router, injector, moduleConfig); });
        // Start monitoring the URL
        if (!router.urlRouter.interceptDeferred) {
            router.urlService.listen();
            router.urlService.sync();
        }
    });
    return router;
}
export function parentUIViewInjectFactory(r) { return { fqn: null, context: r.root() }; }
export var _UIROUTER_INSTANCE_PROVIDERS = [
    { provide: UIRouter, useFactory: uiRouterFactory, deps: [LocationStrategy, PlatformLocation, Injector] },
    { provide: UIView.PARENT_INJECT, useFactory: parentUIViewInjectFactory, deps: [StateRegistry] },
];
export function fnStateService(r) { return r.stateService; }
export function fnTransitionService(r) { return r.transitionService; }
export function fnUrlMatcherFactory(r) { return r.urlMatcherFactory; }
export function fnUrlRouter(r) { return r.urlRouter; }
export function fnUrlService(r) { return r.urlService; }
export function fnViewService(r) { return r.viewService; }
export function fnStateRegistry(r) { return r.stateRegistry; }
export function fnGlobals(r) { return r.globals; }
export var _UIROUTER_SERVICE_PROVIDERS = [
    { provide: StateService, useFactory: fnStateService, deps: [UIRouter] },
    { provide: TransitionService, useFactory: fnTransitionService, deps: [UIRouter] },
    { provide: UrlMatcherFactory, useFactory: fnUrlMatcherFactory, deps: [UIRouter] },
    { provide: UrlRouter, useFactory: fnUrlRouter, deps: [UIRouter] },
    { provide: UrlService, useFactory: fnUrlService, deps: [UIRouter] },
    { provide: ViewService, useFactory: fnViewService, deps: [UIRouter] },
    { provide: StateRegistry, useFactory: fnStateRegistry, deps: [UIRouter] },
    { provide: UIRouterGlobals, useFactory: fnGlobals, deps: [UIRouter] },
];
/**
 * The UI-Router providers, for use in your application bootstrap
 *
 * @deprecated use [[UIRouterModule.forRoot]]
 */
export var UIROUTER_PROVIDERS = _UIROUTER_INSTANCE_PROVIDERS.concat(_UIROUTER_SERVICE_PROVIDERS);
//# sourceMappingURL=providers.js.map