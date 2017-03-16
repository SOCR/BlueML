/**
 * Created by jakeclose on 3/15/17.
 */
import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Training_data_Page }   from './training_data_page.component';
import { upload_data }   from './upload_data_page.component';
import { PageNotFoundComponent }   from './PageNotFound.component';






const appRoutes: Routes = [
    { path: 'trainingData', component: Training_data_Page },
    { path: 'upload_data', component: upload_data },
    { path: '',   redirectTo: '/trainingData', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }



    //{ path: 'heroes', component: HeroListComponent },
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
