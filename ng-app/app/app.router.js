"use strict";
/** UIRouter Config  */
function UIRouterConfigFn(router) {
    // If no URL matches, go to the `analysis` state's name by default
    router.urlService.rules.otherwise({ state: 'home' });
}
exports.UIRouterConfigFn = UIRouterConfigFn;
//# sourceMappingURL=app.router.js.map