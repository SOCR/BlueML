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
var ng2_file_upload_1 = require('ng2-file-upload');
var URL = 'http://localhost:3000/uploadData';
var uploadDataComponent = (function () {
    function uploadDataComponent(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Please upload your data';
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
    }
    uploadDataComponent.prototype.ngOnInit = function () {
        this.formData = this.formDataService.getData();
        console.log('Upload data feature loaded!');
    };
    uploadDataComponent.prototype.ngOnDestroy = function () {
        this.formDataService.setData(this.formData);
    };
    uploadDataComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    uploadDataComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], uploadDataComponent.prototype, "formData", void 0);
    uploadDataComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-upload',
            templateUrl: 'app/uploadData/uploadData.component.html'
        }), 
        __metadata('design:paramtypes', [formData_service_1.FormDataService])
    ], uploadDataComponent);
    return uploadDataComponent;
}());
exports.uploadDataComponent = uploadDataComponent;
//# sourceMappingURL=uploadData.component.js.map