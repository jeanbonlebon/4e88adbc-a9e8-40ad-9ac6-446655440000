import { Component, AfterContentInit } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})

export class LandingComponent {

    offers: any  = [
      {active: false, type: 'Starter', pricing: 'free', storage: '30Gb' },
      {active: true, type: 'Developer', pricing: '15$ /Mo', storage: '500Gb' },
      {active: false, type: 'Business', pricing: '30$ /Mo', storage: '2To' },
      {active: false, type: 'Compagnies', pricing: '60$ /Mo', storage: '10To' }
    ];

    constructor() {}
}
