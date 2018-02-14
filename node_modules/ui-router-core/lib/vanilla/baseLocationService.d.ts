/**
 * @internalapi
 * @module vanilla
 */ /** */
import { LocationServices } from "../common/coreservices";
import { Disposable } from "../interface";
import { UIRouter } from "../router";
import { LocationLike, HistoryLike } from "./interface";
/** A base `LocationServices` */
export declare abstract class BaseLocationServices implements LocationServices, Disposable {
    fireAfterUpdate: boolean;
    constructor(router: UIRouter, fireAfterUpdate: boolean);
    _listener: (evt: any) => void;
    private _listeners;
    _location: LocationLike;
    _history: HistoryLike;
    abstract _get(): string;
    abstract _set(state: any, title: string, url: string, replace: boolean): any;
    hash: () => any;
    path: () => any;
    search: () => any;
    url(url?: string, replace?: boolean): string;
    onChange(cb: EventListener): () => Function[];
    dispose(router: UIRouter): void;
}
