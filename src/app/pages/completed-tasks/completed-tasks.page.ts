import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../models/task';
import { of, switchMap } from 'rxjs';
import { TaskFilterService } from 'src/app/services/task-filter/task-filter.service';
import { ActionSheetController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TasksComponent]
})
export class CompletedTasksPage implements OnInit {
  taskList: Task[] = [];

  constructor( private storage: StorageService,
      private taskFilterService: TaskFilterService,
      private actionSheetCtrl: ActionSheetController) { }

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
          console.log('tasksList en com[pleted-taskPage',data);
          this.taskList = this.taskFilterService.sortTaskList(data, 0)
        });
         console.log('TaskList en completed-task.page after filter',this.taskList)
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
    if(task.done === 0){
      this.storage.updateTaskStatusById(task.id.toString(), true);
    }else{
      this.storage.updateTaskStatusById(task.id.toString(), false);
    }
  }
}