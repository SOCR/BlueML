import { Component, OnInit, Input }   from '@angular/core';

import { FormDataService }            from './data/formData.service';

@Component ({
    selector:     'blue-ml-app'
    ,templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit {
    title = 'BlueML';
    @Input() formData;
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getData();
        console.log(this.title + ' loaded!');
    }
}