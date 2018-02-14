var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { BaseLocationServices, parseUrl } from "ui-router-core";
/** A `LocationServices` that uses the browser hash "#" to get/set the current location */
export var Ng2LocationServices = (function (_super) {
    __extends(Ng2LocationServices, _super);
    function Ng2LocationServices(router, _locationStrategy, _platform) {
        _super.call(this, router, true);
        this._locationStrategy = _locationStrategy;
        this._platform = _platform;
        this._locationStrategy.onPopState(this._listener);
    }
    Ng2LocationServices.prototype._get = function () {
        return this._locationStrategy.path(true);
    };
    Ng2LocationServices.prototype._set = function (state, title, url, replace) {
        var _a = parseUrl(url), path = _a.path, search = _a.search, hash = _a.hash;
        var urlWithHash = path + (hash ? "#" + hash : "");
        if (replace) {
            this._locationStrategy.replaceState(state, title, urlWithHash, search);
        }
        else {
            this._locationStrategy.pushState(state, title, urlWithHash, search);
        }
    };
    Ng2LocationServices.prototype.dispose = function (router) {
        _super.prototype.dispose.call(this, router);
    };
    return Ng2LocationServices;
}(BaseLocationServices));
//# sourceMappingURL=locationService.js.map