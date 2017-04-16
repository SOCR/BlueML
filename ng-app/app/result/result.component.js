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
// imports: [
//
//     ChartsModule
//
// ]
var resultComponent = (function () {
    function resultComponent(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Thanks for staying tuned!';
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
    }
    // events
    resultComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    resultComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    resultComponent.prototype.randomize = function () {
        // Only Change 3 values
        var data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        var clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
    };
    resultComponent.prototype.ngOnInit = function () {
        this.formData = this.formDataService.getData();
        console.log('Result feature loaded!');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], resultComponent.prototype, "formData", void 0);
    resultComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-result',
            templateUrl: 'app/result/result.component.html'
        }), 
        __metadata('design:paramtypes', [formData_service_1.FormDataService])
    ], resultComponent);
    return resultComponent;
}());
exports.resultComponent = resultComponent;
// @Component({
//     selector: 'mt-wizard-result',
//     templateUrl: 'app/result/result.component.html'
// })
//
// export class resultComponent {
//     public barChartOptions:any = {
//         scaleShowVerticalLines: false,
//         responsive: true
//     };
//     public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
//     public barChartType:string = 'bar';
//     public barChartLegend:boolean = true;
//
//     public barChartData:any[] = [
//         {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
//         {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
//     ];
//
//     // events
//     public chartClicked(e:any):void {
//         console.log(e);
//     }
//
//     public chartHovered(e:any):void {
//         console.log(e);
//     }
//
//     public randomize():void {
//         // Only Change 3 values
//         let data = [
//             Math.round(Math.random() * 100),
//             59,
//             80,
//             (Math.random() * 100),
//             56,
//             (Math.random() * 100),
//             40];
//         let clone = JSON.parse(JSON.stringify(this.barChartData));
//         clone[0].data = data;
//         this.barChartData = clone;
//
//     }
// } 
//# sourceMappingURL=result.component.js.map