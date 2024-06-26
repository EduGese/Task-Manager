import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../models/task';
import { of, switchMap } from 'rxjs';
import { TaskFilterService } from 'src/app/services/task-filter/task-filter.service';


@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TasksComponent]
})
export class CompletedTasksPage implements OnInit {
  taskList: Task[] = [];

  constructor( private storage: StorageService,  private taskFilterService: TaskFilterService) { }

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
  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
    }
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