import { DateFormatService } from './../date-format/date-format.service';
import { Task } from './../../models/task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskFilterService {
  dateNow:Date = new Date();

  constructor(private dateFormatService:DateFormatService) { }

  // sortTaskListDue(taskList: Task[], done: number, past: boolean){
  //   const taskDateList = taskList
  //     .filter((task: Task) => task.done !== done && task.due_date !== '')
  //     .map((task: Task) => ({
  //       ...task,
  //       due_date: new Date(task.due_date),
  //     }))
  //     .sort((a: any, b: any) => a.due_date.getTime() - b.due_date.getTime())
  //     .map((task: any) => ({
  //       ...task,
  //       due_date: this.dateFormatService.toIsoString(task.due_date),
  //     }));

  //   const taskNoDateList = taskList.filter(
  //     (task: Task) => task.done !== done && task.due_date === ''
  //   );
  //   return  [...taskDateList, ...taskNoDateList];
  // }
  sortTaskList(taskList: Task[], done: number,  hasDate: boolean, completed: boolean, past?: boolean){
    const taskListAll = taskList
      .filter((task: Task) => task.done !== done && task.due_date !== '')
      .map((task: Task) => ({
        ...task,
        due_date: new Date(task.due_date),
      }))
      .sort((a: any, b: any) => a.due_date.getTime() - b.due_date.getTime())
      .map((task: any) => ({
        ...task,
        due_date: this.dateFormatService.toIsoString(task.due_date),
      }));

    const taskNoDateList = taskList.filter(
      (task: Task) => task.done !== done && task.due_date === ''
    );
    const taskDateList = taskListAll.filter(
      (task: Task) => task.done !== done && task.due_date !== ''
    );
    const taskDateListPast = taskDateList.filter((task)=>{
       return new Date(task.due_date) < this.dateNow;
    })
    const taskDateListDue = taskDateList.filter((task)=>{
      return new Date(task.due_date) > this.dateNow;
   })
   

    
    if (completed) {
      return [...taskDateList, ...taskNoDateList];
    }
    
    if (!hasDate) {
      return taskNoDateList;
    } else if (past) {
      return taskDateListPast;
    } else {
      return taskDateListDue;
    }
  }
  
}
