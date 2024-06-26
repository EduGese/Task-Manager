import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { StorageService } from 'src/app/services/storage.service';


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

  constructor(private storage: StorageService) { }
 
 
  priorityColor(priority: string): string{
    if(priority === 'H'){
      return 'danger';
    }else if(priority === 'M'){
      return 'warning';
    }else{
      return 'success';
    } 
  }
  tagIcon(tag:string):string{
    switch(tag){
      case 'Work':
        return 'hammer-outline';
      case 'Personal':
        return 'person-outline';
      case 'Study':
        return 'book-outline';
      case 'Home':
        return 'home-outline';
      case 'Finance':
        return 'cash-outline';
      case 'Health':
        return 'medkit-outline';
      case 'Leisure':
        return 'beer-outline';
      default:
        return 'help-circle-outline';
    }
  }
  tagIconColor(tag:string):string{
    switch(tag){
      case 'Work':
        return 'primary';
      case 'Personal':
        return 'secondary';
      case 'Study':
        return 'terciary';
      case 'Home':
        return 'warning';
      case 'Finance':
        return 'success';
      case 'Health':
        return 'danger';
      case 'Leisure':
        return 'dark';
      default:
        return 'medium';
    }
  }
  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
      this.modalDismissEmitter.emit('close');
    }
  }

}
