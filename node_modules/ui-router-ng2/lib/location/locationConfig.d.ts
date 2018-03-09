/** @module ng2 */
/** */
import { UIRouter } from "ui-router-core";
import { PlatformLocation, LocationStrategy } from "@angular/common";
export declare class Ng2LocationConfig {
    platformLocation: PlatformLocation;
    private _isHtml5;
    private _hashPrefix;
    constructor(router: UIRouter, locationStrategy: LocationStrategy, platformLocation: PlatformLocation);
    dispose(): void;
    port: () => number;
    protocol: () => string;
    host: () => string;
    baseHref: () => string;
    html5Mode: () => boolean;
    hashPrefix: (newprefix?: string) => string;
}
