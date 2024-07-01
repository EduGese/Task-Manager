import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, EnvironmentInjector } from '@angular/core';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule,  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {

  constructor(public environmentInjector: EnvironmentInjector) {}


  
}