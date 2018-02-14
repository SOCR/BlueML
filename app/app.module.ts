import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UIRouterModule} from "ui-router-ng2";
import {FormsModule} from '@angular/forms';
/* App Root */
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
/* Feature Components */
import {homeComponent} from './homepage/home.component';
import {analysisComponent} from './analysis/analysis.component';
import {uploadDataComponent} from './uploadData/uploadData.component';
import {trainingDataComponent} from './trainingData/trainingData.component';
import {resultComponent} from './result/result.component';
import {ToolTipModule} from 'angular2-tooltip'
/* App Router */
import {UIRouterConfigFn} from "./app.router";
import {appStates} from "./app.states";
/* Upload Service */
import {FileDropDirective, FileSelectDirective} from 'ng2-file-upload';
/* Shared Service */
import {FormDataService} from './data/formData.service';

@NgModule({
    imports:      [ BrowserModule, 
                    FormsModule,
                    ToolTipModule,
                    UIRouterModule.forRoot({ 
                      states: appStates,
                      useHash: true,
                      config: UIRouterConfigFn
                    }) 
                  ],
    providers:    [{ provide: FormDataService, useClass: FormDataService }],
    declarations: [ AppComponent,FileSelectDirective, FileDropDirective,
        NavbarComponent, homeComponent, trainingDataComponent,
        uploadDataComponent, analysisComponent, resultComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {}