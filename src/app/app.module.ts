import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';



import { Training_data_Page }   from './training_data_page.component';
import { upload_data }   from './upload_data_page.component';
import { PageNotFoundComponent }   from './PageNotFound.component';






@NgModule({
  imports:      [ BrowserModule,
      AppRoutingModule],
  declarations: [ AppComponent,
      Training_data_Page,
      upload_data,
      PageNotFoundComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
