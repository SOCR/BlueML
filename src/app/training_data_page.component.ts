/**
 * Created by jakeclose on 3/15/17.
 */


import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from './data/formData.service';

@Component({
    selector: 'relative-path',
    templateUrl: './app/pages/page1.component.html',
    styleUrls:  ['./app/pages/css/layout.component.css'],
    providers: [FormDataService]
})



export class TrainingDataComponent implements OnInit{

    @Input() formData;

    constructor(private formDataService: FormDataService) {
    }

    ngOnInit(){
        this.formData = this.formDataService.getData();
    }

}
