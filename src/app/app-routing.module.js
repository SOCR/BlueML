"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by jakeclose on 3/15/17.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var training_data_page_component_1 = require('./training_data_page.component');
var upload_data_page_component_1 = require('./upload_data_page.component');
var PageNotFound_component_1 = require('./PageNotFound.component');
var appRoutes = [
    { path: 'trainingData', component: training_data_page_component_1.Training_data_Page },
    { path: 'upload_data', component: upload_data_page_component_1.upload_data },
    { path: '', redirectTo: '/trainingData', pathMatch: 'full' },
    { path: '**', component: PageNotFound_component_1.PageNotFoundComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map