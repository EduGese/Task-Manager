import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { IonicModule } from '@ionic/angular';
 import { FormsModule} from '@angular/forms';
 import { Task } from '../../models/task';	

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true,
})
export class TaskFormComponent  {

  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskPriority: string = '';
  newTaskTag: string = '';
  @Output() taskEmitted = new EventEmitter<Task>();
  
  constructor() { }
  createTask() {
    const newTask = {
      id:0,
      name: this.newTaskName,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      tag: this.newTaskTag,
      done:false
    };
    this.taskEmitted.emit(newTask);
    this.clearForm();
  }

  updateTask(task: Task) {
    // if (task.id) {
    //   const id = task.id?.toString();
    //   this.storage.updateTaskById(
    //     id,
    //     task.name,
    //     task.description,
    //     task.priority,
    //     task.tag
    //   );
    // }
  }
  clearForm() {
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskPriority = '';
    this.newTaskTag = '';
  }


}
