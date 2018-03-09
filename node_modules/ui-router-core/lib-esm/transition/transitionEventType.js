import { TransitionHook } from "./transitionHook";
/**
 * This class defines a type of hook, such as `onBefore` or `onEnter`.
 * Plugins can define custom hook types, such as sticky states does for `onInactive`.
 *
 * @interalapi
 */
var TransitionEventType = (function () {
    function TransitionEventType(name, hookPhase, hookOrder, criteriaMatchPath, reverseSort, getResultHandler, getErrorHandler, rejectIfSuperseded) {
        if (reverseSort === void 0) { reverseSort = false; }
        if (getResultHandler === void 0) { getResultHandler = TransitionHook.HANDLE_RESULT; }
        if (getErrorHandler === void 0) { getErrorHandler = TransitionHook.REJECT_ERROR; }
        if (rejectIfSuperseded === void 0) { rejectIfSuperseded = true; }
        this.name = name;
        this.hookPhase = hookPhase;
        this.hookOrder = hookOrder;
        this.criteriaMatchPath = criteriaMatchPath;
        this.reverseSort = reverseSort;
        this.getResultHandler = getResultHandler;
        this.getErrorHandler = getErrorHandler;
        this.rejectIfSuperseded = rejectIfSuperseded;
    }
    return TransitionEventType;
}());
export { TransitionEventType };
//# sourceMappingURL=transitionEventType.js.map