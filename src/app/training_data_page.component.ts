/**
 * Created by jakeclose on 3/15/17.
 */


import { Component } from '@angular/core';

@Component({
    template: `<h1>The {{title}}</h1>
    <p>Datasets:</p>
    <ul>
      <li *ngFor="let data_set of data_set">
        {{ data_set }}
      </li>
    </ul>

    `,
})

export class Training_data_Page  {
    title = 'Training Data Page';
    data_sets = ['Ann Arbor', 'MIT', 'Berkley', 'UCI'];


}
