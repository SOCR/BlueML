/**
 * @coreapi
 * @module core
 */ /** */
import { StateParams } from "./params/stateParams";
import { StateDeclaration } from "./state/interface";
import { State } from "./state/stateObject";
import { Transition } from "./transition/transition";
import { Queue } from "./common/queue";
/**
 * Global router state
 *
 * This is where we hold the global mutable state such as current state, current
 * params, current transition, etc.
 */
export declare class UIRouterGlobals {
    /**
     * Current parameter values
     *
     * The parameter values from the latest successful transition
     */
    params: StateParams;
    /**
     * Current state
     *
     * The to-state from the latest successful transition
     */
    current: StateDeclaration;
    /**
     * Current state (internal object)
     *
     * The to-state from the latest successful transition
     * @internalapi
     */
    $current: State;
    /**
     * The current transition (in progress)
     */
    transition: Transition;
    /** @internalapi */
    transitionHistory: Queue<Transition>;
    /** @internalapi */
    successfulTransitions: Queue<Transition>;
}
