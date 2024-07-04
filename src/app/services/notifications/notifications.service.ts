import { Injectable } from '@angular/core';
import { LocalNotifications, Schedule, ScheduleOptions } from '@capacitor/local-notifications';
import { Task } from '../../models/task';
import { DateFormatService } from '../date-format/date-format.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor( private dateFormatService:DateFormatService) { }

  async scheduleNotificacion(task: Task){
    const dateTime: Schedule = {
      at: new Date(task.due_date)
    }
        let options:ScheduleOptions = {
          notifications:[
            {
              id:task.id,
              title:task.name,
              body:"Your task is ended",
              largeBody:"Tienes una tarea pendiente desde hace tiempo",
              summaryText:"Blabla",
              schedule: dateTime
            }
          ]
        }
        try{
         await LocalNotifications.schedule(options);
         console.log(dateTime);
        }catch(err){
          console.log(err);
        }
      }
      setNotificationDateTime(due_date:string, date_range:string):string{
        const dateNotification:Date = new Date(due_date);
        if (date_range === '1 day') {
          dateNotification.setHours(dateNotification.getHours() - 24);
          console.log( 'DateNotification 1 day', this.dateFormatService.toIsoString(dateNotification));
        } else if (date_range === '1 hour') {
          dateNotification.setHours(dateNotification.getHours() - 1);
          console.log( 'DateNotification 1 hour', this.dateFormatService.toIsoString(dateNotification));
        } else {
          dateNotification.setMinutes(dateNotification.getMinutes() - 5);
          console.log( 'DateNotification 5 min', this.dateFormatService.toIsoString(dateNotification));
        }
        return this.dateFormatService.toIsoString(dateNotification);
      }

}
