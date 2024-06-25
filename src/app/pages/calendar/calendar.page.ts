import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import {
  CalendarA11y,
  CalendarCommonModule,
  CalendarDateFormatter,
  CalendarDayModule,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarMonthModule,
  CalendarUtils,
  CalendarView,
  CalendarWeekModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventColor } from 'calendar-utils';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject, of, switchMap } from 'rxjs';
import {  ActionSheetController } from '@ionic/angular/standalone';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StorageService } from 'src/app/services/storage.service';
import { Task } from '../../models/task';

0
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule],
    providers: [
      CalendarUtils,
      CalendarDateFormatter,
      CalendarEventTitleFormatter,
      {
        provide: DateAdapter,
        useFactory: adapterFactory,
      },
      CalendarA11y,
    ],
    animations: [
      trigger('collapse', [
        state('void', style({ height: '0px', opacity: 0 })),
        state('*', style({ height: '*', opacity: 1 })),
        transition(':enter, :leave', [
          animate('0.2s')
        ])
      ])
    ]
})


export class CalendarPage  implements OnInit{
  // viewDate: Date = new Date();
  // events: CalendarEvent[] = [];
  // view: CalendarView = CalendarView.Month;
  // CalendarView = CalendarView;
  // activeDayIsOpen!: boolean;
  taskList!: Task[];
  @ViewChild('modalContent', { static: true }) modalContent!: IonModal;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: { ...colors['red'] },
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: { ...colors['yellow'] },
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: { ...colors['blue'] },
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: { ...colors['yellow'] },
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private actionSheetCtrl: ActionSheetController, private storage: StorageService) { }
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
          this.taskList =  data;
          this.events = data.map((task: Task) => ({
            title: task.name,
            start: new Date(task.due_date),
            color: task.done ? colors['blue'] : colors['red'],
            actions: this.actions,
          }));
        });
      console.log('this.taskList en calendar.page', this.taskList);
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  async handleEvent(action: string, event: CalendarEvent): Promise<void> {
    this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
    const actionSheet = await this.actionSheetCtrl.create();

    actionSheet.present();
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  // closeOpenMonthViewDay() {
  //   this.activeDayIsOpen = false;
  // }

}
