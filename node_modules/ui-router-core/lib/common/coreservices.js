"use strict";
exports.notImplemented = function (fnname) { return function () {
    throw new Error(fnname + "(): No coreservices implementation for UI-Router is loaded.");
}; };
var services = {
    $q: undefined,
    $injector: undefined,
};
exports.services = services;
//# sourceMappingURL=coreservices.js.map