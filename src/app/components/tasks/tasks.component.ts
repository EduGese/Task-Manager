import { TaskStylesService } from './../../services/task-styles/task-styles.service';

import { Component, EventEmitter, Input, Output, ViewChild, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { Task } from '../../models/task';
import {  ActionSheetController } from '@ionic/angular/standalone';
import { TaskFormComponent } from "../task-form/task-form.component";
import { StorageService } from 'src/app/services/storage.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { IonItemSliding } from '@ionic/angular';



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
  

  constructor(private actionSheetCtrl: ActionSheetController,
     private storage: StorageService,
    private taskStylesService: TaskStylesService) {}

  deleteTask(id: number) {
      this.taskIdDeleteEmitted.emit(id);
  }
  completeTask(task: Task, slidingItem: IonItemSliding) {
    console.log('complete', task);
    this.taskCompleteEmitted.emit(task);
    slidingItem.close();

  }
  updateTask(task: Task, slidingItem: IonItemSliding) {
    this.openModalEditForm(task);
    slidingItem.close();
  }
  priorityColor(priority: string): string{
    return this.taskStylesService.priorityColor(priority);
  }
  tagIcon(tag:string):string{
   
    return this.taskStylesService.tagIcon(tag);
  }
  tagIconColor(tag:string):string{
  
    return this.taskStylesService.tagIconColor(tag);
  }
  async openActionSheet(task: Task, slidingItem: IonItemSliding) {
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
          this.updateTask(task,slidingItem );
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
// MODAL details
  openModalDetails(task: Task) {
    console.log('openModalDetails at task.component', task)
    this.modalDetailsTrigger = true;
    this.task = task;
  }
  
  closeModalDetails() {
    this.modalDetailsTrigger = false;
    this.detailsModal.dismiss(this.task,'cancel')
  }
  dismissModalDetails(action: string){
    if(action === 'close'){
      this.closeModalDetails();
    }
  }

  //MODAL editForm
  openModalEditForm(task: Task) {
    console.log('openModalEditForm at task.component', task)
    this.modalFormTrigger = true;
    this.task = task;
  }
  
  closeModalEditForm() {
    this.modalFormTrigger = false;
    this.FormEditModal.dismiss(this.task,'cancel')
  }
  editTask(task:Task){
   console.log('editTask at task.component',task)
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
