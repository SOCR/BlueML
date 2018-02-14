/** @module ng2 */
/** */
import { UIRouter, BaseLocationServices } from "ui-router-core";
import { PlatformLocation, LocationStrategy } from "@angular/common";
/** A `LocationServices` that uses the browser hash "#" to get/set the current location */
export declare class Ng2LocationServices extends BaseLocationServices {
    private _locationStrategy;
    private _platform;
    constructor(router: UIRouter, _locationStrategy: LocationStrategy, _platform: PlatformLocation);
    _get(): string;
    _set(state: any, title: string, url: string, replace: boolean): any;
    dispose(router: UIRouter): void;
}
