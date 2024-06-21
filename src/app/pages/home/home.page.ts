import { Component, OnDestroy, OnInit,} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../models/task';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import {  Subscription, of, switchMap } from 'rxjs';
import { TaskFilterService } from 'src/app/services/task-filter/task-filter.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, TasksComponent, TaskFormComponent],
})
export class HomePage implements OnInit, OnDestroy {
  taskList: Task[] = [];
  taskListAll:Task[] = [];
  modalTasTrigger: boolean = false;
  filterType: string= '';
  filterTypeSubscription!: Subscription;

  constructor(private storage: StorageService, private taskFilterService: TaskFilterService) {}


  ngOnDestroy(): void {
    //this.filterTypeSubscription.unsubscribe();
    console.log('se destruye')
  }

  ngOnInit(): void {
        
    try {
      this.filterTypeSubscription = this.taskFilterService.filterType$.subscribe(//Get Filter type
        (filterType) => {
          console.log('filterType', filterType);
          this.filterType = filterType;
          if(this.filterType === 'Pending'){//Filter
                  this.taskList =  this.getPendingTaskList(this.taskListAll);
                  console.log('Pending', this.taskList )
                }else if(this.filterType === 'Completed'){
                  this.taskList =  this.getCompletedTaskList(this.taskListAll);
                  console.log('Completed', this.taskList )
                }
               
        }
       
      ); 
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

          console.log('se llama a la bbdd')
          this.taskListAll =  data;
          this.taskList = this.getPendingTaskList(data);

        });
      console.log('this.taskList en home.page', this.taskList);
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
  getPendingTaskList(data: Task[]): Task[] {
    const taskDateList = data
      .filter((task: Task) => task.done !== 1 && task.due_date !== '')
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
      (task: Task) => task.done !== 1 && task.due_date === ''
    );
    return  [...taskDateList, ...taskNoDateList];
  }
  getCompletedTaskList(data: Task[]): Task[]{
    const taskDateList = data
    .filter((task: Task) => task.done === 1 && task.due_date !== '')
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
    (task: Task) => task.done === 1 && task.due_date === ''
  );
  return  [...taskDateList, ...taskNoDateList];
  }
  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
    }
  }
  async completeTask(task: Task) {
    if (task.done === 0) {
      await this.storage.updateTaskStatusById(task.id.toString(), true);
      this.filterType = 'Pending';
      //this.taskList =  this.getPendingTaskList(this.taskListAll);
     

    } else {
      await this.storage.updateTaskStatusById(task.id.toString(), false);
      this.filterType = 'Completed';
    }
  }
}