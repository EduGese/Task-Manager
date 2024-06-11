import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../models/task';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true,
})
export class TasksComponent implements OnInit {

  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskPriority: string = '';
  newTaskTag: string = '';
  taskList: Task[] = [];
  isWeb: any;

  constructor(private storage: StorageService) {}

  ngOnInit() {
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
          this.taskList = data; // Update the task list when the data changes
        });
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
  async createTask() {
    await this.storage.addTask(
      this.newTaskName,
      this.newTaskDescription,
      this.newTaskPriority,
      this.newTaskTag
    );
    this.clearForm();
  }

  updateTask(task: Task) {
    const id = task.id.toString();
      this.storage.updateTaskById(id,task.name, task.description, task.priority, task.tag)
  }

  deleteTask(task: Task) {
         this.storage.deleteTaskById(task.id.toString())
     }
  clearForm() {
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskPriority = '';
    this.newTaskTag = '';
  }
}
