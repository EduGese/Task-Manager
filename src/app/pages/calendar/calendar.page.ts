import { CommonModule} from '@angular/common';
import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal, ModalController } from '@ionic/angular';
import {
  CalendarA11y,
  CalendarCommonModule,
  CalendarDateFormatter,
  CalendarDayModule,
  CalendarEvent,
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
import {  isSameDay, isSameMonth } from 'date-fns';
import { Subject, of, switchMap } from 'rxjs';
import {  ActionSheetController } from '@ionic/angular/standalone';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StorageService } from 'src/app/services/storage.service';
import { Task } from '../../models/task';
import { TaskDetailsComponent } from 'src/app/components/task-details/task-details.component';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';

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
  green:{
    primary: '#2dd55b',
    secondary: '#28bb50',
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    TaskDetailsComponent,
    TaskFormComponent,
  ],
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
      transition(':enter, :leave', [animate('0.2s')]),
    ]),
  ],
})
export class CalendarPage implements OnInit {
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //TASKS Properties
  taskList!: Task[];
  task: Task = {
    id: 0,
    name: '',
    description: '',
    priority: 'low',
    tag: 'work',
    done: 0,
    creation_date: '',
    due_date: '',
    notification_date_range:'',
    notification_date:''

  };
  days: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  //MODALS properties
  modalFormTrigger: boolean = false;
  modalDetailsTrigger: boolean = false;
  @ViewChild(IonModal) detailsModal!: IonModal;
  @ViewChild(IonModal) FormEditModal!: IonModal;
  isEditForm = true;

  //CALENDAR properties
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  activeDayIsOpen: boolean = false;
  customHeader!: TemplateRef<any>;

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private storage: StorageService,
    private modalCtrl: ModalController
  ) {}
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
          this.taskList = data;
          this.events = data.map((task: Task) => ({
            id: task.id,
            title: task.name,
            start: new Date(task.due_date),
            color: task.done ? colors['green'] : colors['yellow'],
            //actions: this.actions,
          }));
        });
      console.log('this.taskList en calendar.page', this.taskList);
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  //CALENDAR functions//

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
    console.log('handleEvent', action, event);
    this.modalData = { event, action };
    this.task = this.taskList.find((task) => task.id === event.id)!;
    this.openModalDetails(this.task);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  //MODAL FUNCTIONS//
  async openModalDetails(task: Task) {
    this.task = task;
    const modal = await this.modalCtrl.create({
      component: TaskDetailsComponent,
      componentProps: {
        task: this.task,
      },
    });
    await modal.present();
  }
 
}
