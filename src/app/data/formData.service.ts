/**
 * Created by Temuulen on 3/23/2017.
 */

import { Injectable }     from '@angular/core';

import { FormData }       from './formData.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();

    getData(): FormData {
        return this.formData;
    }

    setData(formData: FormData) {
        this.formData = formData;
    }
}
