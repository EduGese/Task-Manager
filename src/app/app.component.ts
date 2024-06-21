import { TaskFilterService } from './services/task-filter/task-filter.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Task } from './models/task'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TaskFormComponent, RouterOutlet, RouterLink, RouterLinkActive ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);
  modalTrigger: boolean = false;

  constructor(private storage: StorageService, private TaskFilterService:TaskFilterService) {}

  setPendingFilter() {
    this.TaskFilterService.setFilterType('Pending')
  }
  setCompletedFilter() {
    this.TaskFilterService.setFilterType('Completed')
  }
  isModalOpen() {
   this.modalTrigger = true;
  }
  closeModal(){
    this.modalTrigger = false;
  }
  createTask(task: Task) {
    this.storage.addTask(
      task.name,
      task.description,
      task.priority,
      task.tag,
      task.creation_date,
      task.due_date
    );
    this.closeModal();
  }
  
}