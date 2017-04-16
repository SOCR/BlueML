"use strict";
var FormData = (function () {
    function FormData() {
        this.trainingData = '';
        this.training_Data = [];
        this.user_ecg_data = [];
        //algorithms: Algorithm[] = [];
        this.algorithm = '';
        this.features = [];
    }
    return FormData;
}());
exports.FormData = FormData;
var user_data = (function () {
    function user_data() {
        this.name = '';
        this.path = '';
    }
    return user_data;
}());
exports.user_data = user_data;
var meta_data = (function () {
    function meta_data() {
        this.key = '';
        this.value = '';
    }
    return meta_data;
}());
exports.meta_data = meta_data;
var algorithm = (function () {
    function algorithm() {
        this.name = '';
    }
    return algorithm;
}());
exports.algorithm = algorithm;
var Feature = (function () {
    function Feature() {
        this.name = '';
    }
    return Feature;
}());
exports.Feature = Feature;
var training_data = (function () {
    function training_data() {
        this.name = '';
        this.path = '';
    }
    return training_data;
}());
exports.training_data = training_data;
//# sourceMappingURL=formData.model.js.map