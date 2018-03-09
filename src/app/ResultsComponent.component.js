"use strict";
/**
 * Created by jakeclose on 3/15/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ResultsComponent = /** @class */ (function () {
    function ResultsComponent() {
        this.title = 'Results Page';
        this.students = ['Jake', 'Tem', 'Syed'];
    }
    ResultsComponent = __decorate([
        core_1.Component({
            selector: 'relative-path',
            templateUrl: './app/pages/ResultsComponent.component.html'
        })
    ], ResultsComponent);
    return ResultsComponent;
}());
exports.ResultsComponent = ResultsComponent;
//# sourceMappingURL=ResultsComponent.component.js.map