import { Component, OnDestroy, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../components/tasks/tasks.component';
import { StorageService } from '../services/storage.service';
import { Task } from '../models/task';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { Subscription, of, switchMap } from 'rxjs';
import { ModalService } from '../services/modal/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, TasksComponent, TaskFormComponent],
})
export class HomePage implements OnInit, OnDestroy {
  taskList: Task[] = [];
  modalTrigger: boolean = false;
  modalsubscription!: Subscription;


  constructor(
    private storage: StorageService,
    private modalService: ModalService
 
  ) {}
  ngOnDestroy(): void {
    this.modalsubscription.unsubscribe();
  }
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
          this.taskList = data
            .filter((task: Task) => task.done !== 1)
            .map((task: Task) => ({
              ...task,
              due_date: new Date(task.due_date),
            }))
            .sort(
              (a: any, b: any) => a.due_date.getTime() - b.due_date.getTime()
            )
            .map((task: any) => ({
              ...task,
              due_date: task.due_date.toString(),
            }));

          this.modalsubscription = this.modalService.currentModalTrigger.subscribe(
            trigger => this.modalTrigger = trigger
          );
        });
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  createTask(task: Task) {
    this.storage.addTask(
      task.name,
      task.description,
      task.priority,
      task.tag,
      task.creation_date,
      task.due_date
    );
    this.closeModal();
  }
  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
    }
  }
  completeTask(id: number) {
    if (id) {
      this.storage.updateTaskStatusById(id.toString());
    }
  }


  //Modal functions
  closeModal() {
    this.modalService.changeModalTrigger(false);
  }

}