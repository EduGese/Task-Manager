import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { Task } from '../../models/task';
import {  ActionSheetController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true,
})
export class TasksComponent  {
  @Input () taskList: Task[] = [];
  @Output() taskIdDeleteEmitted = new EventEmitter<number>();
  @Output() taskCompleteEmitted = new EventEmitter<Task>();
  @ViewChild('modal') modal!: IonModal;
  isOpen = false;
  task: Task = {} as Task;
  modalDetailsTrigger: boolean = false;
  @ViewChild(IonModal) detailsModal!: IonModal;

  constructor(private actionSheetCtrl: ActionSheetController) {}

  deleteTask(id: number) {
      this.taskIdDeleteEmitted.emit(id);
  }
  completeTask(task: Task) {
    this.taskCompleteEmitted.emit(task);
  }
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
  async openActionSheet(task: Task) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${task.name} `,
      buttons:[{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler:()=>{
          this.deleteTask(task.id);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
      }],
      cssClass: 'custom-css',
      animated: true,
      backdropDismiss: true,
      mode: 'ios'

    });

    actionSheet.present();

    }

  openModal(task: Task) {
    this.modalDetailsTrigger = true;
    this.task = task;
  }
  
  closeModal() {
    this.modalDetailsTrigger = false;
    this.detailsModal.dismiss(this.task,'cancel')
  }
}
