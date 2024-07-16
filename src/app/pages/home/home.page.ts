import { Component,  OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../models/task';
import {  of, switchMap } from 'rxjs';
import { TaskFilterService } from 'src/app/services/task-filter/task-filter.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TasksComponent],
})
export class HomePage implements OnInit {
  //taskList: Task[] = [];
  taskListDate: Task[] = [];
  taskListNoDate: Task[] = [];
  taskListDatePast: Task[] = [];
  taskListDateDue: Task[] = [];
  task!: Task;
  constructor(private storage: StorageService, private taskFilterService: TaskFilterService) {}

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
          //this.taskListDate = this.taskFilterService.sortTaskList(data, 1, true, false);
          this.taskListDatePast = this.taskFilterService.sortTaskList(data, 1, true, false, true);
          this.taskListDateDue = this.taskFilterService.sortTaskList(data, 1, true, false, false);
          this.taskListNoDate = this.taskFilterService.sortTaskList(data, 1, false, false);
        });
      console.log('taskListDateDue en home.page', this.taskListDateDue);
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
    }
  }
  completeTask(task: Task) {
    console.log('Task completed:', task);
    this.task = task;
    if (task.done === 0) {
      this.deleteNotification();
      this.task.done = 1;
      this.storage.updateTaskStatusById(this.task);
    } else {
      this.task.done = 0;
      this.storage.updateTaskStatusById(this.task);
      
    }
  }
  deleteNotification(){
    this.task.notification_date = '';
    this.task.notification_date_range = '';
  }
}