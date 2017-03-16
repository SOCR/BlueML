import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>The {{project}} project by the {{program}} 2017 team</h1>
            
 
    <nav>
      <a routerLink="/trainingData" routerLinkActive="active">TrainingData</a>
      <a routerLink="/upload_data" >Upload Data</a>
   
    </nav>
    <router-outlet>
    
    </router-outlet>
    `,
})
export class AppComponent  {
  project = 'BlueML';
  program = 'MDP';


}
