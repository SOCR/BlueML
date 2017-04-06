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
var core_1 = require('@angular/core');
var ui_router_ng2_1 = require("ui-router-ng2");
var formData_service_1 = require('./pages/data/formData.service');
var AppComponent = (function () {
    function AppComponent(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Blue_ML';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.formData = this.formDataService.getData();
        console.log(this.title + ' loaded!');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "formData", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            directives: [ui_router_ng2_1.UIROUTER_DIRECTIVES],
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [formData_service_1.FormDataService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
<<<<<<< HEAD
/*
export class AppComponent  {
  project = 'BlueML';
  program = 'MDP';


}
*/ 
=======
>>>>>>> parent of a676681... Working with test result page
//# sourceMappingURL=app.component.js.map