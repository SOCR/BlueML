import { Component, OnInit, Input, OnDestroy }   from '@angular/core';

import { FormDataService }                       from '../data/formData.service';

import { Dataset } from './dataset';

import { Selected } from './Select';

import { User } from './user.interface';

const DATASETS: Dataset[] = [
    {id: 0, name:'MICHIGAN', description: '273 users', selected: false, pushed: false },
    {id: 1, name:'BERKELEY', description: '100 patients',selected: false, pushed: false},
    {id: 2, name:'UCI', description: '1000 patients',selected: false, pushed: false},
    {id: 3, name:'STANDFORD', description: '2000 million patients',selected: false, pushed: false}
];



@Component ({
    selector:     'mt-wizard-training',
    styles: [`
	h1 {
	  color: yellow;
	}
	`]
    ,templateUrl: 'app/trainingData/trainingData.component.html'
})

export class trainingDataComponent implements OnInit, OnDestroy {
    title = 'Please select a training data  set';
    datasets = DATASETS;


    public user: User;

    public genders = [
        { value: 'F', display: 'Female' },
        { value: 'M', display: 'Male' }
    ];

    public topics = [
        { value: 'game', display: 'Gaming' },
        { value: 'tech', display: 'Technology' },
        { value: 'life', display: 'Lifestyle' },
    ];

    public toggles = [
        { value: 'toggled', display: 'Toggled' },
        { value: 'untoggled', display: 'UnToggled' },
    ];



    public selected: Selected;

    public listSelected = [


    ];


    selectedDataset:  Dataset;

    onSelect(): void {
        DATASETS[0].selected = true;
        this.selectedDataset = DATASETS[0];

        console.log("checked",)
    }

    addSelect(newSelect:number){
        if(newSelect == 0){//special because the value is 0;
            // if(this.listSelected.find(Selected=>Selected.id === newSelect)) {
            //     this.listSelected.push(new Selected(newSelect))
            //     this.datasets[newSelect].selected = true;
            // }
            if(!this.datasets[newSelect].selected) {
                console.log("the michigan is already there");
                if(!this.datasets[newSelect].pushed){
                    this.listSelected.push(new Selected(newSelect));
                    this.datasets[newSelect].pushed = true;
                }
                this.datasets[newSelect].selected = true;
            }else{
                this.datasets[newSelect].selected = false;
            }
        }
        if(newSelect){
            if(!this.datasets[newSelect].selected) {
                console.log("checked", newSelect);
                if(!this.datasets[newSelect].pushed){
                    this.listSelected.push(new Selected(newSelect));
                    this.datasets[newSelect].pushed = true;
                }
                this.datasets[newSelect].selected = true;
            }else{
                this.datasets[newSelect].selected = false;
            }
        }
    }





    @Input() formData;
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        // this.formData = this.formDataService.getData();
        // console.log('Training data feature loaded!');
        this.user = {
            name: '',
            gender: this.genders[0].value,
            role: null,
            isActive: false,
            toggle: this.toggles[1].value,
            topics: [this.topics[1].value]
        }
    }

    ngOnDestroy() {
        this.formDataService.setData(this.formData);
    }
}