/** @module state */ /** for typedoc */
import { extend, inherit, pluck } from "../common/common";
import { isString } from "../common/predicates";
import { State } from "./stateObject";
/** @internalapi */
var StateQueueManager = (function () {
    function StateQueueManager($registry, $urlRouter, states, builder, listeners) {
        this.$registry = $registry;
        this.$urlRouter = $urlRouter;
        this.states = states;
        this.builder = builder;
        this.listeners = listeners;
        this.queue = [];
    }
    /** @internalapi */
    StateQueueManager.prototype.dispose = function () {
        this.queue = [];
    };
    StateQueueManager.prototype.register = function (config) {
        var _a = this, states = _a.states, queue = _a.queue;
        // Wrap a new object around the state so we can store our private details easily.
        // @TODO: state = new State(extend({}, config, { ... }))
        var state = inherit(new State(), extend({}, config, {
            self: config,
            resolve: config.resolve || [],
            toString: function () { return config.name; }
        }));
        if (!isString(state.name))
            throw new Error("State must have a valid name");
        if (states.hasOwnProperty(state.name) || pluck(queue, 'name').indexOf(state.name) !== -1)
            throw new Error("State '" + state.name + "' is already defined");
        queue.push(state);
        this.flush();
        return state;
    };
    StateQueueManager.prototype.flush = function () {
        var _a = this, queue = _a.queue, states = _a.states, builder = _a.builder;
        var registered = [], // states that got registered
        orphans = [], // states that don't yet have a parent registered
        previousQueueLength = {}; // keep track of how long the queue when an orphan was first encountered
        while (queue.length > 0) {
            var state = queue.shift();
            var result = builder.build(state);
            var orphanIdx = orphans.indexOf(state);
            if (result) {
                var existingState = this.$registry.get(state.name);
                if (existingState && existingState.name === state.name) {
                    throw new Error("State '" + state.name + "' is already defined");
                }
                if (existingState && existingState.name === state.name + ".**") {
                    // Remove future state of the same name
                    this.$registry.deregister(existingState);
                }
                states[state.name] = state;
                this.attachRoute(state);
                if (orphanIdx >= 0)
                    orphans.splice(orphanIdx, 1);
                registered.push(state);
                continue;
            }
            var prev = previousQueueLength[state.name];
            previousQueueLength[state.name] = queue.length;
            if (orphanIdx >= 0 && prev === queue.length) {
                // Wait until two consecutive iterations where no additional states were dequeued successfully.
                // throw new Error(`Cannot register orphaned state '${state.name}'`);
                queue.push(state);
                return states;
            }
            else if (orphanIdx < 0) {
                orphans.push(state);
            }
            queue.push(state);
        }
        if (registered.length) {
            this.listeners.forEach(function (listener) { return listener("registered", registered.map(function (s) { return s.self; })); });
        }
        return states;
    };
    StateQueueManager.prototype.attachRoute = function (state) {
        if (state.abstract || !state.url)
            return;
        this.$urlRouter.rule(this.$urlRouter.urlRuleFactory.create(state));
    };
    return StateQueueManager;
}());
export { StateQueueManager };
//# sourceMappingURL=stateQueueManager.js.map