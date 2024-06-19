import { Component, EventEmitter, Input, Output, ViewChild, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { Task } from '../../models/task';
import {  ActionSheetController } from '@ionic/angular/standalone';
import { TaskFormComponent } from "../task-form/task-form.component";
import { StorageService } from 'src/app/services/storage.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, FormsModule, TaskFormComponent, TaskDetailsComponent]
})
export class TasksComponent  {
  @Input () taskList: Task[] = [];
  @Output() taskIdDeleteEmitted = new EventEmitter<number>();
  @Output() taskCompleteEmitted = new EventEmitter<Task>();
  //@ViewChild('modal') modal!: IonModal;
  task: Task = {} as Task;
  isEditForm = true;
    
  //Modals
  isOpen = false;
  modalDetailsTrigger: boolean = false;
  modalFormTrigger: boolean = false;
  @ViewChild(IonModal) detailsModal!: IonModal;
  @ViewChild(IonModal) FormEditModal!: IonModal;
  

  constructor(private actionSheetCtrl: ActionSheetController, private storage: StorageService) {}

  deleteTask(id: number) {
      this.taskIdDeleteEmitted.emit(id);
  }
  completeTask(task: Task) {
    this.taskCompleteEmitted.emit(task);
  }
  updateTask(task: Task) {
    this.openModalEditForm(task);
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
      },
      {
        text: 'Edit',
        icon: 'create-outline',
        handler:()=>{
          this.updateTask(task);
        }
      },
      {
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

  openModalDetails(task: Task) {
    this.modalDetailsTrigger = true;
    this.task = task;
  }
  
  closeModalDetails() {
    this.modalDetailsTrigger = false;
    this.detailsModal.dismiss(this.task,'cancel')
  }

  openModalEditForm(task: Task) {
    this.modalFormTrigger = true;
    this.task = task;
  }
  
  closeModalEditForm() {
    this.modalFormTrigger = false;
    this.FormEditModal.dismiss(this.task,'cancel')
  }
  editTask(task:Task){
    console.log('editTask at task.component',task.due_date)
    // const due_date = new Date(task.due_date);
    // task.due_date = due_date.toISOString();
    this.storage.updateTaskById(
      task.id.toString(),
      task.name,
      task.description,
      task.priority,
      task.tag,
      task.due_date
    )
    this.closeModalEditForm();
  }

}
