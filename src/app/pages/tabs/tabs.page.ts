import { Component, EnvironmentInjector, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';
import { StorageService } from 'src/app/services/storage.service';
import { Task } from '../../models/task';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonicModule,
    TaskFormComponent,
    RouterModule 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class TabsPage {
  @ViewChild(IonModal) modal!: IonModal ;

  constructor(public environmentInjector: EnvironmentInjector, private storage: StorageService) { }
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