import { Task } from './../../models/task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskFilterService {

  constructor() { }

  sortTaskList(taskList: Task[], done: number){
    const taskDateList = taskList
      .filter((task: Task) => task.done !== done && task.due_date !== '')
      .map((task: Task) => ({
        ...task,
        due_date: new Date(task.due_date),
      }))
      .sort((a: any, b: any) => a.due_date.getTime() - b.due_date.getTime())
      .map((task: any) => ({
        ...task,
        due_date: task.due_date.toISOString(),
      }));

    const taskNoDateList = taskList.filter(
      (task: Task) => task.done !== done && task.due_date === ''
    );
    return  [...taskDateList, ...taskNoDateList];
  }
}
