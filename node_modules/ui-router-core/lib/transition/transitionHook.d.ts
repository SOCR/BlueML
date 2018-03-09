/**
 * @coreapi
 * @module transition
 */ /** for typedoc */
import { TransitionHookOptions, HookResult } from "./interface";
import { Transition } from "./transition";
import { State } from "../state/stateObject";
import { StateService } from "../state/stateService";
import { RegisteredHook } from "./hookRegistry";
export declare type GetResultHandler = (hook: TransitionHook) => ResultHandler;
export declare type GetErrorHandler = (hook: TransitionHook) => ErrorHandler;
export declare type ResultHandler = (result: HookResult) => Promise<HookResult>;
export declare type ErrorHandler = (error) => Promise<any>;
/** @hidden */
export declare class TransitionHook {
    private transition;
    private stateContext;
    private registeredHook;
    private options;
    constructor(transition: Transition, stateContext: State, registeredHook: RegisteredHook, options: TransitionHookOptions);
    stateService: () => StateService;
    static HANDLE_RESULT: GetResultHandler;
    static IGNORE_RESULT: GetResultHandler;
    static LOG_ERROR: GetErrorHandler;
    static REJECT_ERROR: GetErrorHandler;
    static THROW_ERROR: GetErrorHandler;
    private rejectIfSuperseded;
    invokeHook(): Promise<HookResult>;
    /**
     * This method handles the return value of a Transition Hook.
     *
     * A hook can return false (cancel), a TargetState (redirect),
     * or a promise (which may later resolve to false or a redirect)
     *
     * This also handles "transition superseded" -- when a new transition
     * was started while the hook was still running
     */
    handleHookResult(result: HookResult): Promise<HookResult>;
    toString(): string;
    /**
     * Run all TransitionHooks, ignoring their return value.
     */
    static runAllHooks(hooks: TransitionHook[]): void;
    /**
     * Given an array of TransitionHooks, runs each one synchronously and sequentially.
     * Should any hook return a Rejection synchronously, the remaining hooks will not run.
     *
     * Returns a promise chain composed of any promises returned from each hook.invokeStep() call
     */
    static runOnBeforeHooks(hooks: TransitionHook[]): Promise<any>;
}
