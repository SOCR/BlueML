import { Component, OnInit, Input, OnDestroy }   from '@angular/core';

import {FormData}                              from '../data/formData.model';
import { FormDataService }                       from '../data/formData.service';

@Component ({
    selector:     'mt-wizard-analysis'
    ,templateUrl: '/app/analysis/analysis.component.html'
})

export class analysisComponent implements OnInit, OnDestroy {
    title = 'Please select algorithm parameters';



    @Input() formData: FormData;



    available_features = ['Q-R-S Interval (msec)', 'P-R Interval (msec)', 't-Q-T Interval (msec)', 'T Interval (msec)', 'P Interval (msec)', 'Heart Rate (bpm)'];
    available_algorithms = ['Support Vector Machines', 'K-Nearest Neighbor', 'Linear Discriminant Analysis', 'Naïve Bayes'];
    selected_features = [];
    selected_advanced_options = false;

    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getData();
        console.log('Analysis feature loaded!');
    }

    ngOnDestroy() {
        this.formDataService.setData(this.formData);
    }




    selectFeature(feature: string) {
        console.log("selected");
        console.log(feature);


        //this.selected_features.push(feature)
        let indexOfFeature = this.formData.features.indexOf(feature);
        console.log(indexOfFeature);
        if (indexOfFeature == -1){
            let feature_json = "feature:" + feature;
            this.formData.features.push(feature_json);
         }
         else {
            this.formData.features.splice( indexOfFeature, 1);
            console.log("Already been added")
        }
    }

    selectAdvance(){
        this.selected_advanced_options = true;
    }







    changeAlgo(value: number) {

        length = this.available_algorithms.length;
        let selection: number = Math.floor((length / 10) * value);
        console.log(selection);
        let algorthim_json = "algorithm:" + this.available_algorithms[selection];
        this.formData.algorithm = algorthim_json;





    }
}



