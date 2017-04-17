"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var training_data_page_component_1 = require("./training_data_page.component");
var upload_data_page_component_1 = require("./upload_data_page.component");
var AnalysisComponent_component_1 = require("./AnalysisComponent.component");
var ResultsComponent_component_1 = require("./ResultsComponent.component");
var PageNotFound_component_1 = require("./PageNotFound.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule],
        declarations: [app_component_1.AppComponent,
            training_data_page_component_1.TrainingDataComponent,
            upload_data_page_component_1.UploadDataComponent,
            AnalysisComponent_component_1.AnalysisComponent,
            ResultsComponent_component_1.ResultsComponent,
            PageNotFound_component_1.PageNotFoundComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map