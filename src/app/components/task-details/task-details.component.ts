import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { StorageService } from 'src/app/services/storage.service';
import { TaskStylesService } from 'src/app/services/task-styles/task-styles.service';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class TaskDetailsComponent {
  @Input () task!: Task;
  @Output() modalDismissEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private storage: StorageService, private taskStylesService: TaskStylesService) { }
 
 
  priorityColor(priority: string): string{
    return this.taskStylesService.priorityColor(priority);
  }
  tagIcon(tag:string):string{
    return this.taskStylesService.tagIcon(tag);
  }
  tagIconColor(tag:string):string{
    return this.taskStylesService.tagIconColor(tag);
  }
  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
      this.modalDismissEmitter.emit('close');
    }
  }

}
