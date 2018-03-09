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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var formData_service_1 = require("../data/formData.service");
var DATASETS = [
    { id: 0, name: 'UMICH', description: '273 users' },
    { id: 1, name: 'BERKELEY', description: '100 patients' },
    { id: 2, name: 'UCI', description: '1000 patients' },
    { id: 3, name: 'STANDFOR', description: '2000 million patients' }
];

/* Upon realizing the upload feature, the trainingDataComponent should look similar to uploadDataComponent */

var trainingDataComponent = /** @class */ (function () {
    function trainingDataComponent(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Please select a training data set';
        this.datasets = DATASETS;
    }
    trainingDataComponent.prototype.onSelect = function (dataset) {
        this.selectedDataset = dataset;
    };
    trainingDataComponent.prototype.ngOnInit = function () {
        this.formData = this.formDataService.getData();
        console.log('Training data feature loaded!');
    };
    trainingDataComponent.prototype.ngOnDestroy = function () {
        this.formDataService.setData(this.formData);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], trainingDataComponent.prototype, "formData", void 0);
    trainingDataComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-training',
            templateUrl: 'app/trainingData/trainingData.component.html'
        }),
        __metadata("design:paramtypes", [formData_service_1.FormDataService])
    ], trainingDataComponent);
    return trainingDataComponent;
}());
exports.trainingDataComponent = trainingDataComponent;
//# sourceMappingURL=trainingData.component.js.map