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
var formData_model_1 = require('../data/formData.model');
var formData_service_1 = require('../data/formData.service');
var analysisComponent = (function () {
    function analysisComponent(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Please select algorithm parameters';
        this.available_features = ['Q-R-S Interval (msec)', 'P-R Interval (msec)', 't-Q-T Interval (msec)', 'T Interval (msec)', 'P Interval (msec)', 'Heart Rate (bpm)'];
        this.available_algorithms = ['Support Vector Machines', 'K-Nearest Neighbor', 'Linear Discriminant Analysis', 'Naïve Bayes'];
        this.selected_features = [];
        this.selected_advanced_options = false;
    }
    analysisComponent.prototype.ngOnInit = function () {
        this.formData = this.formDataService.getData();
        console.log('Analysis feature loaded!');
    };
    analysisComponent.prototype.ngOnDestroy = function () {
        this.formDataService.setData(this.formData);
    };
    analysisComponent.prototype.selectFeature = function (feature) {
        console.log("selected");
        console.log(feature);
        //this.selected_features.push(feature)
        var indexOfFeature = this.formData.features.indexOf(feature);
        console.log(indexOfFeature);
        if (indexOfFeature == -1) {
            var feature_json = "feature:" + feature;
            this.formData.features.push(feature_json);
        }
        else {
            this.formData.features.splice(indexOfFeature, 1);
            console.log("Already been added");
        }
    };
    analysisComponent.prototype.selectAdvance = function () {
        this.selected_advanced_options = true;
    };
    analysisComponent.prototype.changeAlgo = function (value) {
        length = this.available_algorithms.length;
        var selection = Math.floor((length / 10) * value);
        console.log(selection);
        var algorthim_json = "algorithm:" + this.available_algorithms[selection];
        this.formData.algorithm = algorthim_json;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', formData_model_1.FormData)
    ], analysisComponent.prototype, "formData", void 0);
    analysisComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-analysis',
            templateUrl: '/app/analysis/analysis.component.html'
        }), 
        __metadata('design:paramtypes', [formData_service_1.FormDataService])
    ], analysisComponent);
    return analysisComponent;
}());
exports.analysisComponent = analysisComponent;
//# sourceMappingURL=analysis.component.js.map