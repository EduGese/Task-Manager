import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../components/tasks/tasks.component';
import { StorageService } from '../services/storage.service';
import { Task } from '../models/task';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { of, switchMap } from 'rxjs';
import { IonModal } from '@ionic/angular';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
standalone: true,
imports: [IonicModule, TasksComponent, TaskFormComponent],
})
export class HomePage implements OnInit{
  taskList: Task[] = [];
  @ViewChild(IonModal) modal: IonModal | undefined;

constructor(private storage: StorageService) {}
  ngOnInit(): void {
    
    try {
      this.storage
        .taskState()
        .pipe(
          switchMap((res) => {
            if (res) {
              return this.storage.fetchTasks();
            } else {
              return of([]); // Return an empty array when res is false
            }
          })
        )
        .subscribe((data) => {
          this.taskList = data.filter((task: Task) => task.done !== 1)
          //this.taskList = data; // Update the task list when the data changes

        });
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
    
  }

createTask(task: Task) {
    this.storage.addTask(
      task.name,
      task.description,
      task.priority,
      task.tag
    );
    this.closeModal();
    
  }
  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
    }
  }
  completeTask(id: number) {
    if (id) {
      this.storage.updateTaskStatusById(id.toString());
    }
  }

  //Modal functions
  closeModal() {
    this.modal?.dismiss();
  }
}