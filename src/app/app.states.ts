/**
 * Created by jakeclose on 3/15/17.
 */
import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TrainingDataComponent }   from './training_data_page.component';
import { UploadDataComponent }   from './upload_data_page.component';
import { AnalysisComponent }   from './AnalysisComponent.component';
import { ResultsComponent }   from './ResultsComponent.component';
import { PageNotFoundComponent }   from './PageNotFound.component';






export const appStates = [

    { path: 'trainingData', component: TrainingDataComponent },
    { path: 'upload_data', component: UploadDataComponent },
    { path: 'analysis', component: AnalysisComponent },
    { path: 'results', component: ResultsComponent },



//    { path: '',   redirectTo: '/trainingData', pathMatch: 'full' },
 //   { path: '**', component: PageNotFoundComponent }



    //{ path: 'heroes', component: HeroListComponent },
];