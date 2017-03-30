import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import forms module + ui module
import { UIRouterModule }     from "ui-router-ng2";
import { FormsModule }        from '@angular/forms';



import { AppComponent }  from './app.component';
//import { AppRoutingModule } from './app-routing.module';


//Page Components
import { TrainingDataComponent }   from './training_data_page.component';
import { UploadDataComponent }   from './upload_data_page.component';
import { AnalysisComponent }   from './AnalysisComponent.component';
import { ResultsComponent }   from './ResultsComponent.component';
import { PageNotFoundComponent }   from './PageNotFound.component';




/* App Router */
import { UIRouterConfigFn }   from "./app.router";
import { appStates }          from "./app.states";


/* Shared Service */
import { FormDataService }    from './pages/data/formData.service'



@NgModule({
  imports:      [ BrowserModule,
      FormsModule,
      UIRouterModule.forRoot({
          states: appStates,
          useHash: true,
          config: UIRouterConfigFn
      }) ],
  providers:    [{ provide: FormDataService, useClass: FormDataService }],
  declarations: [ AppComponent,
      TrainingDataComponent,
      UploadDataComponent,
      AnalysisComponent,
      ResultsComponent,
      PageNotFoundComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
