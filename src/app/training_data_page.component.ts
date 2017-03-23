/**
 * Created by jakeclose on 3/15/17.
 */


import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormDataService } from './../app/data/formData.service';

@Component({
    selector: 'relative-path',
    templateUrl: './app/pages/page1.component.html',
    styleUrls:  ['./app/pages/css/layout.component.css'],
    providers: [FormDataService]
})

export class TrainingDataComponent implements OnInit, onDestroy  {
    ngOnInit(){

    }
    
}
