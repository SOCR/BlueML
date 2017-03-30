import { Component, OnInit, Input, OnDestroy }   from '@angular/core';

import { FormData }                              from '../data/formData.model';
import { FormDataService }                       from '../data/formData.service';

@Component ({
    selector:     'mt-wizard-home'
    ,templateUrl: '/app/homepage/home.component.html'
})

export class homeComponent implements OnInit, OnDestroy {
    title = 'Welcome to BlueML';
    info = "a web-based, open source machine learning application designed for wavelet-based analysis of EKG and EEG waveform, intended to diagnose cardiac and neurological disorders.";
    @Input() formData: FormData;
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getData();
        console.log('Home Page loaded!');
    }

    ngOnDestroy() {
        this.formDataService.setData(this.formData);
    }
}
