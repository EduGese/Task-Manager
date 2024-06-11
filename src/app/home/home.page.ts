import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../components/tasks/tasks.component';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
standalone: true,
imports: [IonicModule, TasksComponent],
})
export class HomePage {
constructor() {}
}