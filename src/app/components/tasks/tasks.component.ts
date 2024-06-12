import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { Task } from '../../models/task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true,
})
export class TasksComponent  {
  @Input () taskList: Task[] = [];
  @Output() taskIdEmitted = new EventEmitter<number>();

  constructor() {}

  deleteTask(id: number) {
    // if(task.id == undefined) {
    //   console.error("Task ID is undefined. Cannot delete.");
    //   return;
    // };
      this.taskIdEmitted.emit(id);
  }
}
