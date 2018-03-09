"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** UIRouter Config  */
function UIRouterConfigFn(router) {
    // If no URL matches, go to the `personal` state's name by default
    router.urlService.rules.otherwise({ state: 'trainingData' });
}
exports.UIRouterConfigFn = UIRouterConfigFn;
//# sourceMappingURL=app.router.js.map