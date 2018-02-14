import { isFunction } from "ui-router-core";
import { isDefined } from "ui-router-core";
export function applyModuleConfig(uiRouter, injector, options) {
    if (options === void 0) { options = {}; }
    if (isFunction(options.config)) {
        options.config(uiRouter, injector);
    }
    var states = options.states || [];
    states.forEach(function (state) { return uiRouter.stateRegistry.register(state); });
}
export function applyRootModuleConfig(uiRouter, injector, config) {
    isDefined(config.deferIntercept) && uiRouter.urlService.deferIntercept(config.deferIntercept);
    isDefined(config.otherwise) && uiRouter.urlService.rules.otherwise(config.otherwise);
}
//# sourceMappingURL=uiRouterConfig.js.map