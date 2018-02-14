import { defaults, noop, identity } from "../common/common";
import { fnToString, maxLength } from "../common/strings";
import { isPromise } from "../common/predicates";
import { val, is, parse } from "../common/hof";
import { trace } from "../common/trace";
import { services } from "../common/coreservices";
import { Rejection } from "./rejectFactory";
import { TargetState } from "../state/targetState";
var defaultOptions = {
    current: noop,
    transition: null,
    traceData: {},
    bind: null
};
/** @hidden */
var TransitionHook = (function () {
    function TransitionHook(transition, stateContext, registeredHook, options) {
        var _this = this;
        this.transition = transition;
        this.stateContext = stateContext;
        this.registeredHook = registeredHook;
        this.options = options;
        this.stateService = function () { return _this.transition.router.stateService; };
        this.rejectIfSuperseded = function () {
            return _this.registeredHook.eventType.rejectIfSuperseded && _this.options.current() !== _this.options.transition;
        };
        this.options = defaults(options, defaultOptions);
    }
    TransitionHook.prototype.invokeHook = function () {
        var hook = this.registeredHook;
        if (hook._deregistered)
            return;
        var options = this.options;
        trace.traceHookInvocation(this, this.transition, options);
        if (this.rejectIfSuperseded()) {
            return Rejection.superseded(options.current()).toPromise();
        }
        var cb = hook.callback;
        var bind = this.options.bind;
        var trans = this.transition;
        var state = this.stateContext;
        var errorHandler = hook.eventType.getErrorHandler(this);
        var resultHandler = hook.eventType.getResultHandler(this);
        resultHandler = resultHandler || identity;
        if (!errorHandler) {
            return resultHandler(cb.call(bind, trans, state));
        }
        try {
            return resultHandler(cb.call(bind, trans, state));
        }
        catch (error) {
            return errorHandler(error);
        }
    };
    /**
     * This method handles the return value of a Transition Hook.
     *
     * A hook can return false (cancel), a TargetState (redirect),
     * or a promise (which may later resolve to false or a redirect)
     *
     * This also handles "transition superseded" -- when a new transition
     * was started while the hook was still running
     */
    TransitionHook.prototype.handleHookResult = function (result) {
        // This transition is no longer current.
        // Another transition started while this hook was still running.
        if (this.rejectIfSuperseded()) {
            // Abort this transition
            return Rejection.superseded(this.options.current()).toPromise();
        }
        // Hook returned a promise
        if (isPromise(result)) {
            // Wait for the promise, then reprocess the resolved value
            return result.then(this.handleHookResult.bind(this));
        }
        trace.traceHookResult(result, this.transition, this.options);
        // Hook returned false
        if (result === false) {
            // Abort this Transition
            return Rejection.aborted("Hook aborted transition").toPromise();
        }
        var isTargetState = is(TargetState);
        // hook returned a TargetState
        if (isTargetState(result)) {
            // Halt the current Transition and start a redirected Transition (to the TargetState).
            return Rejection.redirected(result).toPromise();
        }
    };
    TransitionHook.prototype.toString = function () {
        var _a = this, options = _a.options, registeredHook = _a.registeredHook;
        var event = parse("traceData.hookType")(options) || "internal", context = parse("traceData.context.state.name")(options) || parse("traceData.context")(options) || "unknown", name = fnToString(registeredHook.callback);
        return event + " context: " + context + ", " + maxLength(200, name);
    };
    /**
     * Run all TransitionHooks, ignoring their return value.
     */
    TransitionHook.runAllHooks = function (hooks) {
        hooks.forEach(function (hook) { return hook.invokeHook(); });
    };
    /**
     * Given an array of TransitionHooks, runs each one synchronously and sequentially.
     * Should any hook return a Rejection synchronously, the remaining hooks will not run.
     *
     * Returns a promise chain composed of any promises returned from each hook.invokeStep() call
     */
    TransitionHook.runOnBeforeHooks = function (hooks) {
        var results = [];
        for (var _i = 0, hooks_1 = hooks; _i < hooks_1.length; _i++) {
            var hook = hooks_1[_i];
            var hookResult = hook.invokeHook();
            if (Rejection.isTransitionRejectionPromise(hookResult)) {
                // Break on first thrown error or false/TargetState
                return hookResult;
            }
            results.push(hookResult);
        }
        return results
            .filter(isPromise)
            .reduce(function (chain, promise) { return chain.then(val(promise)); }, services.$q.when());
    };
    return TransitionHook;
}());
export { TransitionHook };
TransitionHook.HANDLE_RESULT = function (hook) {
    return function (result) {
        return hook.handleHookResult(result);
    };
};
TransitionHook.IGNORE_RESULT = function (hook) {
    return function (result) { return undefined; };
};
TransitionHook.LOG_ERROR = function (hook) {
    return function (error) {
        return (hook.stateService().defaultErrorHandler()(error), undefined);
    };
};
TransitionHook.REJECT_ERROR = function (hook) {
    return function (error) {
        return Rejection.errored(error).toPromise();
    };
};
TransitionHook.THROW_ERROR = function (hook) {
    return undefined;
};
//# sourceMappingURL=transitionHook.js.map