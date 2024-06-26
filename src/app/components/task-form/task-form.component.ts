import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { IonicModule } from '@ionic/angular';
 import { FormBuilder, FormControl, FormsModule, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
 import { Task } from '../../models/task';	
import { DateFormatService } from 'src/app/services/date-format/date-format.service';

 

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class TaskFormComponent implements OnInit {
  @Output() taskEmitted = new EventEmitter<Task>();
  @Input() task!: Task;
  @Input() isEditForm: boolean = false;
  taskForm!: FormGroup;
  dateNow: string = this.dateFormatService.toIsoString(new Date());
  dateButtonPressed: boolean = false;
  dateToogleChecked = false;

  constructor(private formBuilder: FormBuilder, private dateFormatService:DateFormatService) {}
  ngOnInit(): void {
    if (this.isEditForm) {//Edit form
      
      this.handleDueDateState();
      this.createEditTAskForm();
    } else {//Create form
      
      this.createNewTaskForm();
    }
  }
  createEditTAskForm() {
    this.taskForm = this.formBuilder.group({
      id: this.task.id,
      name: new FormControl(this.task.name, [Validators.required]),
      description: new FormControl(this.task.description),
      priority: new FormControl(this.task.priority),
      tag: new FormControl(this.task.tag),
      done: false,
      creation_date: new FormControl(this.task.creation_date),
      due_date: new FormControl(this.task.due_date),
    });
  }
  createNewTaskForm() {
    this.taskForm = this.formBuilder.group({
      id: 0,
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      priority: new FormControl('M'),
      tag: new FormControl('Work'),
      done: false,
      creation_date: this.dateNow,
      due_date: new FormControl(''),
    });
  }

  sendTask() {
    if (this.taskForm.valid) {
      this.taskEmitted.emit(this.taskForm.value);
      this.task = this.taskForm.value;
    } else {
      alert('Name field is mandatory');
    }
  }

  addDate() {
    if (this.dateButtonPressed) {
      this.dateButtonPressed = false;
      this.taskForm.patchValue({ due_date: '' });
    } else {
      this.dateButtonPressed = true;
      this.taskForm.patchValue({ due_date: this.dateNow });
    }
  }
  handleDueDateState() {
    if (this.task.due_date === '') {
      this.dateButtonPressed = false;
      this.dateToogleChecked = false;
    } else {
      this.dateButtonPressed = true;
      this.dateToogleChecked = true;
    }
  }
  toIsoString(date: Date) {
    let tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num: number) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }
}
