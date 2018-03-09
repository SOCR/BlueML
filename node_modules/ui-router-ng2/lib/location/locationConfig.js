/** @module ng2 */
/** */
import { is, isDefined } from "ui-router-core";
import { PathLocationStrategy } from "@angular/common";
export var Ng2LocationConfig = (function () {
    function Ng2LocationConfig(router, locationStrategy, platformLocation) {
        var _this = this;
        this.platformLocation = platformLocation;
        this._hashPrefix = "";
        this.port = function () { return null; };
        this.protocol = function () { return null; };
        this.host = function () { return null; };
        this.baseHref = function () { return _this.platformLocation.getBaseHrefFromDOM(); };
        this.html5Mode = function () { return _this._isHtml5; };
        this.hashPrefix = function (newprefix) {
            if (isDefined(newprefix)) {
                _this._hashPrefix = newprefix;
            }
            return _this._hashPrefix;
        };
        this._isHtml5 = is(PathLocationStrategy)(locationStrategy);
    }
    Ng2LocationConfig.prototype.dispose = function () { };
    return Ng2LocationConfig;
}());
//# sourceMappingURL=locationConfig.js.map