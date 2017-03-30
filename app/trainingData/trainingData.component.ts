import { Component, OnInit, Input, OnDestroy }   from '@angular/core';

import { FormDataService }                       from '../data/formData.service';

import { Dataset } from './dataset';


const DATASETS: Dataset[] = [
    {id: 0, name:'UMICH', description: '273 users' },
    {id: 1, name:'BERKELEY', description: '100 patients'},
    {id: 2, name:'UCI', description: '1000 patients'},
    {id: 3, name:'STANDFOR', description: '2000 million patients'}
];




@Component ({
    selector:     'mt-wizard-training'
    ,templateUrl: 'app/trainingData/trainingData.component.html'
})

export class trainingDataComponent implements OnInit, OnDestroy {
    title = 'Please select a training data set';
    datasets = DATASETS;


    selectedDataset: Dataset;
    onSelect(dataset: Dataset): void {
        this.selectedDataset = dataset;
    }


    @Input() formData;
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getData();
        console.log('Training data feature loaded!');
    }

    ngOnDestroy() {
        this.formDataService.setData(this.formData);
    }
}