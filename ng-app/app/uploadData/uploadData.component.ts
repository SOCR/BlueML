import { Component, OnInit, Input, OnDestroy }   from '@angular/core';

import { FormDataService }                       from '../data/formData.service';



import {FileUploader} from 'ng2-file-upload';


const URL = 'http://localhost:3000/uploadData';

@Component ({
    selector:     'mt-wizard-upload'
    ,templateUrl: 'app/uploadData/uploadData.component.html'

})



export class uploadDataComponent implements OnInit, OnDestroy {
    title = 'Please upload your data';
    @Input() formData;
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getData();
        console.log('Upload data feature loaded!');
    }

    ngOnDestroy() {
        this.formDataService.setData(this.formData);
    }



    public uploader:FileUploader = new FileUploader({url: URL});

    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
    }




}


