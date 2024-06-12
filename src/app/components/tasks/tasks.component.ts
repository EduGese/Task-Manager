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
      this.taskIdEmitted.emit(id);
  }
  priorityColor(priority: string): string{
    if(priority === 'High'){
      return 'danger';
    }else if(priority === 'Medium'){
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
}
