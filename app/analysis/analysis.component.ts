import { Component, OnInit, Input, OnDestroy }   from '@angular/core';

import { FormData }                              from '../data/formData.model';
import { FormDataService }                       from '../data/formData.service';

@Component ({
    selector:     'mt-wizard-analysis'
    ,templateUrl: '/app/analysis/analysis.component.html'
})

export class analysisComponent implements OnInit, OnDestroy {
    title = 'Please select algorithm parameters';
    @Input() formData: FormData;
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getData();
        console.log('Analysis feature loaded!');
    }

    ngOnDestroy() {
        this.formDataService.setData(this.formData);
    }
}
