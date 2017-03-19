import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { TrainingDataComponent }   from './training_data_page.component';
import { UploadDataComponent }   from './upload_data_page.component';
import { AnalysisComponent }   from './AnalysisComponent.component';
import { ResultsComponent }   from './ResultsComponent.component';
import { PageNotFoundComponent }   from './PageNotFound.component';






@NgModule({
  imports:      [ BrowserModule,
      AppRoutingModule],
  declarations: [ AppComponent,
      TrainingDataComponent,
      UploadDataComponent,
      AnalysisComponent,
      ResultsComponent,
      PageNotFoundComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
