import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>We are working on {{project}}</h1>
            <h1>Under the {{programs}} Program </h1>
  
     <h1>Angular Router</h1>
    <nav>
      <a routerLink="/trainingData" routerLinkActive="active">TrainingData</a>
      <a routerLink="/upload_data" >Upload Data</a>
   
    </nav>
    <router-outlet></router-outlet>
    `,
})
export class AppComponent  {
  project = 'BlueML';
  program = 'MDP';


}
