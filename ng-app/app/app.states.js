"use strict";
var uploadData_component_1 = require('./uploadData/uploadData.component');
var trainingData_component_1 = require('./trainingData/trainingData.component');
var analysis_component_1 = require('./analysis/analysis.component');
var result_component_1 = require('./result/result.component');
var home_component_1 = require('./homepage/home.component');
exports.appStates = [
    // 1st State
    { name: 'home', url: '/home', component: home_component_1.homeComponent },
    { name: 'trainingData', url: '/trainingData', component: trainingData_component_1.trainingDataComponent },
    // 2nd State:
    { name: 'uploadData', url: '/uploadData', component: uploadData_component_1.uploadDataComponent },
    // 3rd State
    { name: 'analysis', url: '/analysis', component: analysis_component_1.analysisComponent },
    // 4th State
    { name: 'result', url: '/result', component: result_component_1.resultComponent }
];
//# sourceMappingURL=app.states.js.map