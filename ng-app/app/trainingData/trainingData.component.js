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
var formData_service_1 = require('../data/formData.service');
var Select_1 = require('./Select');
var DATASETS = [
    { id: 0, name: 'MICHIGAN', description: '273 users', selected: false, pushed: false },
    { id: 1, name: 'BERKELEY', description: '100 patients', selected: false, pushed: false },
    { id: 2, name: 'UCI', description: '1000 patients', selected: false, pushed: false },
    { id: 3, name: 'STANDFORD', description: '2000 million patients', selected: false, pushed: false }
];
var trainingDataComponent = (function () {
    function trainingDataComponent(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Please select a training data  set';
        this.datasets = DATASETS;
        this.genders = [
            { value: 'F', display: 'Female' },
            { value: 'M', display: 'Male' }
        ];
        this.topics = [
            { value: 'game', display: 'Gaming' },
            { value: 'tech', display: 'Technology' },
            { value: 'life', display: 'Lifestyle' },
        ];
        this.toggles = [
            { value: 'toggled', display: 'Toggled' },
            { value: 'untoggled', display: 'UnToggled' },
        ];
        this.listSelected = [];
    }
    trainingDataComponent.prototype.onSelect = function () {
        DATASETS[0].selected = true;
        this.selectedDataset = DATASETS[0];
        console.log("checked");
    };
    trainingDataComponent.prototype.addSelect = function (newSelect) {
        if (newSelect == 0) {
            // if(this.listSelected.find(Selected=>Selected.id === newSelect)) {
            //     this.listSelected.push(new Selected(newSelect))
            //     this.datasets[newSelect].selected = true;
            // }
            if (!this.datasets[newSelect].selected) {
                console.log("the michigan is already there");
                if (!this.datasets[newSelect].pushed) {
                    this.listSelected.push(new Select_1.Selected(newSelect));
                    this.datasets[newSelect].pushed = true;
                }
                this.datasets[newSelect].selected = true;
            }
            else {
                this.datasets[newSelect].selected = false;
            }
        }
        if (newSelect) {
            if (!this.datasets[newSelect].selected) {
                console.log("checked", newSelect);
                if (!this.datasets[newSelect].pushed) {
                    this.listSelected.push(new Select_1.Selected(newSelect));
                    this.datasets[newSelect].pushed = true;
                }
                this.datasets[newSelect].selected = true;
            }
            else {
                this.datasets[newSelect].selected = false;
            }
        }
    };
    trainingDataComponent.prototype.ngOnInit = function () {
        // this.formData = this.formDataService.getData();
        // console.log('Training data feature loaded!');
        this.user = {
            name: '',
            gender: this.genders[0].value,
            role: null,
            isActive: false,
            toggle: this.toggles[1].value,
            topics: [this.topics[1].value]
        };
    };
    trainingDataComponent.prototype.ngOnDestroy = function () {
        this.formDataService.setData(this.formData);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], trainingDataComponent.prototype, "formData", void 0);
    trainingDataComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-training',
            styles: ["\n\th1 {\n\t  color: yellow;\n\t}\n\t"],
            templateUrl: 'app/trainingData/trainingData.component.html'
        }), 
        __metadata('design:paramtypes', [formData_service_1.FormDataService])
    ], trainingDataComponent);
    return trainingDataComponent;
}());
exports.trainingDataComponent = trainingDataComponent;
//# sourceMappingURL=trainingData.component.js.map