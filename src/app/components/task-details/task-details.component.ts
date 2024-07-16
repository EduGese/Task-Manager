import { IonicModule, IonModal, ModalController  } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class TaskDetailsComponent implements OnInit{
  @Input () task!: Task;
 
  
  //Modals
  @ViewChild(IonModal) FormEditModal!: IonModal;
  isEditForm = true;

  //DakMode
  darkMode: boolean = false;

  constructor(
    private storage: StorageService, 
    private taskStylesService: TaskStylesService,
    private modalCtrl: ModalController,
  ) { }
  ngOnInit(): void {
   this.taskStylesService.getDarkModeState().subscribe((darkMode)=>{
      this.darkMode = darkMode;
    })
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
    console.log('editTask, task-details-->',task)
   this.task = task;
    this.storage.updateTaskById(
      task.id.toString(),
      task.name,
      task.description,
      task.priority,
      task.tag,
      task.due_date,
      task.notification_date,
      task.notification_date_range
    )
    
    this.FormEditModal.dismiss(null,'cancel')
  }
  completeTask(task: Task) {
    this.task = task;
    if (this.task.done === 0) {
      console.log('completeTask, task-details-->', task.id)
      this.deleteNotification();
      this.task.done = 1;
      this.storage.updateTaskStatusById(this.task);
    } else {
      this.task.done = 0;
      this.storage.updateTaskStatusById(this.task);
    }
  }
  deleteNotification(){
    this.task.notification_date = '';
    this.task.notification_date_range = '';
  }
}
