import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../models/task';
import { of, switchMap } from 'rxjs';
import { TaskFilterService } from 'src/app/services/task-filter/task-filter.service';
import { ActionSheetController } from '@ionic/angular/standalone';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TasksComponent]
})
export class CompletedTasksPage implements OnInit {
  taskList: Task[] = [];
  task!: Task;

  constructor( private storage: StorageService,
      private taskFilterService: TaskFilterService,
      private actionSheetCtrl: ActionSheetController,
      private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    try {
      this.storage
        .taskState()
        .pipe(
          switchMap((res) => {
            if (res) {
              return this.storage.fetchTasks();
            } else {
              return of([]); // Return an empty array when res is false
            }
          })
        )
        .subscribe((data) => {
          this.taskList = this.taskFilterService.sortTaskList(data, 0);
          console.log('TaskList en completed-task.page after filter',this.taskList)
        });
         
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
  // ActionSheet functions
  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Are you sure to delete all completed tasks? `,
      buttons: [
        {
          text: 'Delete all',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteAllcompletedTasks();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
        },
      ],
      cssClass: 'custom-css',
      animated: true,
      backdropDismiss: true,
      mode: 'ios',
    });

    actionSheet.present();
  }
  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
    }
  }
  deleteAllcompletedTasks(){
    this.storage.deleteCompletedTasks();
  }
  completeTask(task: Task) {
    console.log('Task completed:', task)
    this.task = task;
    if (task.done === 0) {
      this.deleteNotification();
      this.task.done = 1;
      this.storage.updateTaskStatusById(this.task, true);
    } else {
      this.task.done = 0;
      this.storage.updateTaskStatusById(this.task, false);
      
    }
  }
  deleteNotification(){
    this.task.notification_date = '';
    this.task.notification_date_range = '';
  }
}