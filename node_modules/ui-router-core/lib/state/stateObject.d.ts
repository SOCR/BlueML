/**
 * @coreapi
 * @module state
 */ /** for typedoc */
import { StateDeclaration, _ViewDeclaration } from "./interface";
import { Param } from "../params/param";
import { UrlMatcher } from "../url/urlMatcher";
import { Resolvable } from "../resolve/resolvable";
import { TransitionStateHookFn } from "../transition/interface";
import { TargetState } from "./targetState";
import { Transition } from "../transition/transition";
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
export declare class State {
    /** The parent [[State]] */
    parent: State;
    /** The name used to register the state */
    name: string;
    /** Prototypally inherits from [[StateDeclaration.abstract]] */
    abstract: boolean;
    /** Prototypally inherits from [[StateDeclaration.resolve]] */
    resolve: ({
        [key: string]: (string | any[] | Function);
    } | any[]);
    /** A list of [[Resolvable]] objects.  The internal representation of [[resolve]]. */
    resolvables: Resolvable[];
    /** Prototypally inherits from [[StateDeclaration.resolvePolicy]] */
    resolvePolicy: any;
    /** A compiled URLMatcher which detects when the state's URL is matched */
    url: UrlMatcher;
    /** The parameters for the state, built from the URL and [[StateDeclaration.params]] */
    params: {
        [key: string]: Param;
    };
    /**
     * The views for the state.
     * Note: `ui-router-core` does not register a builder for views.
     * The framework specific code should register a `views` builder.
     */
    views: {
        [key: string]: _ViewDeclaration;
    };
    /**
     * The original [[StateDeclaration]] used to build this [[State]].
     * Note: `this` object also prototypally inherits from the `self` declaration object.
     */
    self: StateDeclaration;
    /** The nearest parent [[State]] which has a URL */
    navigable: State;
    /** The parent [[State]] objects from this state up to the root */
    path: State[];
    /**
     * Prototypally inherits from [[StateDeclaration.data]]
     * Note: This is the only field on the [[StateDeclaration]] which is mutated.
     * The definition object's `data` field is replaced with a new object
     * which prototypally inherits from the parent state definition's `data` field.
     */
    data: any;
    /** An array of strings of the parent States' names */
    includes: {
        [name: string]: boolean;
    };
    /** Prototypally inherits from [[StateDeclaration.onExit]] */
    onExit: TransitionStateHookFn;
    /** Prototypally inherits from [[StateDeclaration.onRetain]] */
    onRetain: TransitionStateHookFn;
    /** Prototypally inherits from [[StateDeclaration.onEnter]] */
    onEnter: TransitionStateHookFn;
    /** Prototypally inherits from [[StateDeclaration.lazyLoad]] */
    lazyLoad: (transition: Transition, state: StateDeclaration) => Promise<StateDeclaration[]>;
    /** Prototypally inherits from [[StateDeclaration.redirectTo]] */
    redirectTo: (string | (($transition$: Transition) => TargetState) | {
        state: (string | StateDeclaration);
        params: {
            [key: string]: any;
        };
    });
    constructor(config?: StateDeclaration);
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
    is(ref: State | StateDeclaration | string): boolean;
    /**
     * @deprecated this does not properly handle dot notation
     * @returns Returns a dot-separated name of the state.
     */
    fqn(): string;
    /**
     * Returns the root node of this state's tree.
     *
     * @returns The root of this state's tree.
     */
    root(): State;
    /**
     * Gets the state's `Param`eters
     *
     * Gets [[Param]] information that is owned by the state.
     * If `opts.inherit` is true, it also includes the ancestor states' [[Param]] information.
     * If `opts.matchingKeys` exists, returns only `Param`s whose `id` is a key on the `matchingKeys` object
     *
     * @param opts options
     */
    parameters(opts?: {
        inherit?: boolean;
        matchingKeys?: any;
    }): Param[];
    /**
     * Returns a single [[Param]] that is owned by the state
     *
     * If `opts.inherit` is true, it also searches the ancestor states` [[Param]] information.
     * @param id the name of the [[Param]] to return
     * @param opts options
     */
    parameter(id: string, opts?: {
        inherit?: boolean;
    }): Param;
    toString(): string;
}
