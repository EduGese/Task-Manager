import { IonicModule, IonModal, ModalController  } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { StorageService } from 'src/app/services/storage.service';
import { TaskStylesService } from 'src/app/services/task-styles/task-styles.service';
import { TaskFormComponent } from '../task-form/task-form.component';



@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  imports: [CommonModule, IonicModule, TaskFormComponent],
  standalone: true,
})
export class TaskDetailsComponent {
  @Input () task!: Task;
 
  
  //Modals
  @ViewChild(IonModal) FormEditModal!: IonModal;
  isEditForm = true;

  constructor(private storage: StorageService, 
    private taskStylesService: TaskStylesService,
    private modalCtrl: ModalController
  ) { }
 
 
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
      this.closeModalDetails();
    }
  }
  //MODAL details
  closeModalDetails() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  
  //MODAL editForm

  closeModalEditForm() {
    
    this.FormEditModal.dismiss(this.task,'cancel')
  }
  editTask(task:Task){
   this.task = task;
    this.storage.updateTaskById(
      task.id.toString(),
      task.name,
      task.description,
      task.priority,
      task.tag,
      task.due_date
    )
    this.FormEditModal.dismiss(null,'cancel')
  }
  completeTask(task: Task) {
    if (task.done === 0) {
      this.storage.updateTaskStatusById(task.id.toString(), true);
      this.task.done = 1;
    } else {
      this.storage.updateTaskStatusById(task.id.toString(), false);
      this.task.done = 0;
    }
  }
}
