"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
//import forms module + ui module
var ui_router_ng2_1 = require("ui-router-ng2");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
//import { AppRoutingModule } from './app-routing.module';
//Page Components
var training_data_page_component_1 = require("./training_data_page.component");
var upload_data_page_component_1 = require("./upload_data_page.component");
var AnalysisComponent_component_1 = require("./AnalysisComponent.component");
var ResultsComponent_component_1 = require("./ResultsComponent.component");
var PageNotFound_component_1 = require("./PageNotFound.component");
/* App Router */
var app_router_1 = require("./app.router");
var app_states_1 = require("./app.states");
/* Shared Service */
var formData_service_1 = require("./pages/data/formData.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                ui_router_ng2_1.UIRouterModule.forRoot({
                    states: app_states_1.appStates,
                    useHash: true,
                    config: app_router_1.UIRouterConfigFn
                })],
            providers: [{ provide: formData_service_1.FormDataService, useClass: formData_service_1.FormDataService }],
            declarations: [app_component_1.AppComponent,
                training_data_page_component_1.TrainingDataComponent,
                upload_data_page_component_1.UploadDataComponent,
                AnalysisComponent_component_1.AnalysisComponent,
                ResultsComponent_component_1.ResultsComponent,
                PageNotFound_component_1.PageNotFoundComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map