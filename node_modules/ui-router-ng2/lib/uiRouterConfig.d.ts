/** @module ng2 */ /** */
import { UIRouter } from "ui-router-core";
import { StatesModule, RootModule } from "./uiRouterNgModule";
import { Injector } from "@angular/core";
export declare function applyModuleConfig(uiRouter: UIRouter, injector: Injector, options?: StatesModule): void;
export declare function applyRootModuleConfig(uiRouter: UIRouter, injector: Injector, config: RootModule): void;
