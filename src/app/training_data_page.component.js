/**
 * Created by jakeclose on 3/15/17.
 */
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
var Training_data_Page = (function () {
    function Training_data_Page() {
        this.title = 'Training Data Page';
        this.data_sets = ['Ann Arbor', 'MIT', 'Berkley', 'UCI'];
    }
    Training_data_Page = __decorate([
        core_1.Component({
            template: "<h1>The {{title}}</h1>\n    <p>Datasets:</p>\n    <ul>\n      <li *ngFor=\"let data_set of data_set\">\n        {{ data_set }}\n      </li>\n    </ul>\n\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], Training_data_Page);
    return Training_data_Page;
}());
exports.Training_data_Page = Training_data_Page;
//# sourceMappingURL=training_data_page.component.js.map