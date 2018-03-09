/**
 * @internalapi
 * @module vanilla
 */
/** */
import { isDefined } from "../common/predicates";
/** A `LocationConfig` that delegates to the browser's `location` object */
var BrowserLocationConfig = (function () {
    function BrowserLocationConfig(router, _isHtml5) {
        if (_isHtml5 === void 0) { _isHtml5 = false; }
        this._isHtml5 = _isHtml5;
        this._baseHref = undefined;
        this._hashPrefix = "";
    }
    BrowserLocationConfig.prototype.port = function () {
        return parseInt(location.port);
    };
    BrowserLocationConfig.prototype.protocol = function () {
        return location.protocol;
    };
    BrowserLocationConfig.prototype.host = function () {
        return location.host;
    };
    BrowserLocationConfig.prototype.html5Mode = function () {
        return this._isHtml5;
    };
    BrowserLocationConfig.prototype.hashPrefix = function (newprefix) {
        return isDefined(newprefix) ? this._hashPrefix = newprefix : this._hashPrefix;
    };
    ;
    BrowserLocationConfig.prototype.baseHref = function (href) {
        return isDefined(href) ? this._baseHref = href : this._baseHref || this.applyDocumentBaseHref();
    };
    BrowserLocationConfig.prototype.applyDocumentBaseHref = function () {
        var baseTags = document.getElementsByTagName("base");
        return this._baseHref = baseTags.length ? baseTags[0].href.substr(location.origin.length) : "";
    };
    BrowserLocationConfig.prototype.dispose = function () { };
    return BrowserLocationConfig;
}());
export { BrowserLocationConfig };
//# sourceMappingURL=browserLocationConfig.js.map