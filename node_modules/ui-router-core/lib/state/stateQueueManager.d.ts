import { StateDeclaration } from "./interface";
import { State } from "./stateObject";
import { StateBuilder } from "./stateBuilder";
import { StateRegistryListener, StateRegistry } from "./stateRegistry";
import { Disposable } from "../interface";
import { UrlRouter } from "../url/urlRouter";
/** @internalapi */
export declare class StateQueueManager implements Disposable {
    private $registry;
    private $urlRouter;
    states: {
        [key: string]: State;
    };
    builder: StateBuilder;
    listeners: StateRegistryListener[];
    queue: State[];
    constructor($registry: StateRegistry, $urlRouter: UrlRouter, states: {
        [key: string]: State;
    }, builder: StateBuilder, listeners: StateRegistryListener[]);
    /** @internalapi */
    dispose(): void;
    register(config: StateDeclaration): any;
    flush(): {
        [key: string]: State;
    };
    attachRoute(state: State): void;
}
