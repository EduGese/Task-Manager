import { Injectable } from '@angular/core';
import { CancelOptions, LocalNotifications, Schedule, ScheduleOptions } from '@capacitor/local-notifications';
import { DateFormatService } from '../date-format/date-format.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private dateFormatService: DateFormatService) {}

  async scheduleNotificacion(
    id: number,
    notification_date: string,
    name: string,
    description: string,
    notification_date_range: string
  ) {
    const dateTime: Schedule = {
      at: new Date(notification_date),
    };
    let options: ScheduleOptions = {
      notifications: [
        {
          id: id,
          title: name,
          body: 'Your task is about to end',
          largeBody: description,
          summaryText: `${notification_date_range} to end`,
          schedule: dateTime,
          largeIcon: 'res://drawable/bell_alarm',
          smallIcon: 'res://drawable/bell_alarm',
        },
      ],
    };
    try {
      await LocalNotifications.schedule(options);
      // this.getPendingNotifications();
    } catch (err) {
      console.error(err);
    }
  }

  async cancelNotification(id: number) {
    let options: CancelOptions = { notifications: [{ id: id }] };
    try {
      await LocalNotifications.cancel(options);
      // this.getPendingNotifications();
    } catch (err) {
      console.error(err);
    }
  }

  // async getPendingNotifications() {
  //   await LocalNotifications.getPending().then((res) => {
  //     console.log('Pending notifications: ', res.notifications);
  //   });
  // }
  setNotificationDateTime(due_date: string, date_range: string): string {
    const dateNotification: Date = new Date(due_date);
    if (date_range === '1 day') {
      dateNotification.setHours(dateNotification.getHours() - 24);
    } else if (date_range === '1 hour') {
      dateNotification.setHours(dateNotification.getHours() - 1);
    } else {
      dateNotification.setMinutes(dateNotification.getMinutes() - 5);
    }
    return this.dateFormatService.toIsoString(dateNotification);
  }
}
