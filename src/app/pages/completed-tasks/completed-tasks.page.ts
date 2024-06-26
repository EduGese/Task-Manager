import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../models/task';
import { of, switchMap } from 'rxjs';


@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TasksComponent]
})
export class CompletedTasksPage implements OnInit {
  taskList: Task[] = [];
  constructor( private storage: StorageService) { }

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
          this.taskList =  this.sortTaskList(data);
        });
         console.log('TaskList en completed-task.page after filter',this.taskList)
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
  sortTaskList(data: Task[]): Task[] {
    const taskDateList = data
      .filter((task: Task) => task.done !== 0 && task.due_date !== '')
      .map((task: Task) => ({
        ...task,
        due_date: new Date(task.due_date),
      }))
      .sort((a: any, b: any) => a.due_date.getTime() - b.due_date.getTime())
      .map((task: any) => ({
        ...task,
        due_date: task.due_date.toISOString(),
      }));

    const taskNoDateList = data.filter(
      (task: Task) => task.done !== 0 && task.due_date === ''
    );
    return  [...taskDateList, ...taskNoDateList];
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
