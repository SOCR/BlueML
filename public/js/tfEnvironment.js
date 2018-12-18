import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawableDirective } from './drawable.directive';

import * as tf from '@tensorflow/tfjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    linearModel: tf.Sequential;
    prediction: any;

    model: tf.Model;
    predictions: any;


    ngOnInit() {
        this.trainNewModel();
        this.loadModel();
    }


    async trainNewModel() {

    }

    linearPrediction(val) {

    }



    //// LOAD PRETRAINED KERAS MODEL ////

    async loadModel() {
        this.model = await tf.loadModel('/assets/model.json');
    }

    async predict(imageData: ImageData) {

    }


}

