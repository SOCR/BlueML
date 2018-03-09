/**
 * @coreapi
 * @module state
 */ /** for typedoc */
"use strict";
var common_1 = require("../common/common");
var hof_1 = require("../common/hof");
/**
 * Internal representation of a UI-Router state.
 *
 * Instances of this class are created when a [[StateDeclaration]] is registered with the [[StateRegistry]].
 *
 * A registered [[StateDeclaration]] is augmented with a getter ([[StateDeclaration.$$state]]) which returns the corresponding [[State]] object.
 *
 * This class prototypally inherits from the corresponding [[StateDeclaration]].
 * Each of its own properties (i.e., `hasOwnProperty`) are built using builders from the [[StateBuilder]].
 */
var State = (function () {
    function State(config) {
        common_1.extend(this, config);
        // Object.freeze(this);
    }
    /**
     * Returns true if the provided parameter is the same state.
     *
     * Compares the identity of the state against the passed value, which is either an object
     * reference to the actual `State` instance, the original definition object passed to
     * `$stateProvider.state()`, or the fully-qualified name.
     *
     * @param ref Can be one of (a) a `State` instance, (b) an object that was passed
     *        into `$stateProvider.state()`, (c) the fully-qualified name of a state as a string.
     * @returns Returns `true` if `ref` matches the current `State` instance.
     */
    State.prototype.is = function (ref) {
        return this === ref || this.self === ref || this.fqn() === ref;
    };
    /**
     * @deprecated this does not properly handle dot notation
     * @returns Returns a dot-separated name of the state.
     */
    State.prototype.fqn = function () {
        if (!this.parent || !(this.parent instanceof this.constructor))
            return this.name;
        var name = this.parent.fqn();
        return name ? name + "." + this.name : this.name;
    };
    /**
     * Returns the root node of this state's tree.
     *
     * @returns The root of this state's tree.
     */
    State.prototype.root = function () {
        return this.parent && this.parent.root() || this;
    };
    /**
     * Gets the state's `Param`eters
     *
     * Gets [[Param]] information that is owned by the state.
     * If `opts.inherit` is true, it also includes the ancestor states' [[Param]] information.
     * If `opts.matchingKeys` exists, returns only `Param`s whose `id` is a key on the `matchingKeys` object
     *
     * @param opts options
     */
    State.prototype.parameters = function (opts) {
        opts = common_1.defaults(opts, { inherit: true, matchingKeys: null });
        var inherited = opts.inherit && this.parent && this.parent.parameters() || [];
        return inherited.concat(common_1.values(this.params))
            .filter(function (param) { return !opts.matchingKeys || opts.matchingKeys.hasOwnProperty(param.id); });
    };
    /**
     * Returns a single [[Param]] that is owned by the state
     *
     * If `opts.inherit` is true, it also searches the ancestor states` [[Param]] information.
     * @param id the name of the [[Param]] to return
     * @param opts options
     */
    State.prototype.parameter = function (id, opts) {
        if (opts === void 0) { opts = {}; }
        return (this.url && this.url.parameter(id, opts) ||
            common_1.find(common_1.values(this.params), hof_1.propEq('id', id)) ||
            opts.inherit && this.parent && this.parent.parameter(id));
    };
    State.prototype.toString = function () {
        return this.fqn();
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=stateObject.js.map