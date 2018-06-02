import { Component, AfterContentInit } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})

export class LandingComponent {

    offers: any  = [
      // tslint:disable-next-line:max-line-length
      {active: false, type: 'Starter', pricing: 'gratuit', storage: '30Gb', transfert : false, virus : false, analyse: false, choose: false},
      {active: true, type: 'Developer', pricing: '15€ /Mo', storage: '500Gb', transfert : true, virus : false, analyse: false, choose: true},
      {active: false, type: 'Business', pricing: '30€ /Mo', storage: '2To', transfert : true, virus : true, analyse: false, choose: true},
      {active: false, type: 'Compagnies', pricing: '60€ /Mo', storage: '10To', transfert : true, virus : true, analyse: true, choose: true}
    ];

    services: any  = [
        // tslint:disable-next-line:max-line-length
        {name: 'Confidentialité', icon: 'vpn_lock', description: 'Nous vous assurons la confidentialité de vos données que vous choisirez d\'héberger sur notre plateforme.'},
        // tslint:disable-next-line:max-line-length
        {name: 'Sécurité', icon: 'enhanced_encryption', description: 'Vos données sont cryptées via plusieurs méthodes de chiffrements implémentées par nos soins.'},
        // tslint:disable-next-line:max-line-length
        {name: 'Support', icon: 'forum', description: 'Si vous souhaitez du développement adapté à votre entreprise nous vous proposons de faire évoluer votre offre.'}
    ];
    constructor() {}
}
