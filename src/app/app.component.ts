import { CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Task } from './models/task'
import { SegmentNavigationComponent } from './components/segment-navigation/segment-navigation.component';

import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TaskFormComponent, 
    RouterOutlet, SegmentNavigationComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);
  @ViewChild(IonModal) modal!: IonModal ;


  constructor(private storage: StorageService) {}

  createTask(task: Task) {
      this.storage.addTask(
        task.name,
        task.description,
        task.priority,
        task.tag,
        task.creation_date,
        task.due_date
      );
      this.cancel();
    }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  
}