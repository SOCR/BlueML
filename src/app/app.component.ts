import { Component , OnInit, Input  } from '@angular/core';

import { UIROUTER_DIRECTIVES }   from "ui-router-ng2";

import { FormDataService }            from './pages/data/formData.service'

@Component({
  selector: 'my-app',
  directives:  [ UIROUTER_DIRECTIVES ],
  templateUrl: 'app/app.component.html'
  /*
  template: `<h1>The {{project}} project by the {{program}} 2017 team</h1>
            
 
    <nav>
      <a routerLink="/trainingData" routerLinkActive="active">TrainingData</a>
      <a routerLink="/upload_data" >Upload Data</a>
      <a routerLink="/analysis" >Analysis</a>
      <a routerLink="/results" >Result</a>
    </nav>
    
    <router-outlet>
    
    </router-outlet>
    `,
    */

})




export class AppComponent implements OnInit {
  title = 'Blue_ML';
  @Input() formData;

  constructor(private formDataService: FormDataService) {
  }

  ngOnInit() {
    this.formData = this.formDataService.getData();
    console.log(this.title + ' loaded!');
  }
}

/*
export class AppComponent  {
  project = 'BlueML';
  program = 'MDP';


}
*/