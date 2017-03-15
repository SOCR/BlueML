import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './app.component';
import { Training_data_Page }   from './training_data_page.component';
import { upload_data }   from './upload_data_page.component';

const appRoutes: Routes = [
  { path: 'trainingData', component: Training_data_Page },
    { path: 'upload_data', component: upload_data }



    //{ path: 'heroes', component: HeroListComponent },
];




@NgModule({
  imports:      [ BrowserModule,
                  RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent,
      Training_data_Page,
      upload_data],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
