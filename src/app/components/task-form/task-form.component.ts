import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { IonicModule } from '@ionic/angular';
 import { FormBuilder, FormControl, FormsModule, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
 import { Task } from '../../models/task';	

 

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class TaskFormComponent  implements OnInit{
  createTaskForm!: FormGroup;
  @Output() taskEmitted = new EventEmitter<Task>();
  dateNow: string = new Date().toISOString();
  dateButtonPressed:boolean = false;
  @Input() task!: Task;
  
  constructor(private formBuilder: FormBuilder) { 
    
  }
  ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      id:0,
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      priority: new FormControl('M'),
      tag: new FormControl('Work'),
      done:false,
      creation_date: this.dateNow,
      due_date: new FormControl('')
    });
  }
  createTask() {
    if(this.createTaskForm.valid){
    this.taskEmitted.emit(this.createTaskForm.value);
    this.task = this.createTaskForm.value;
    console.log(this.createTaskForm.value);

    }else{
      alert('Name field is mandatory');
    }
  }
  addDate(){
    if(this.dateButtonPressed){
      this.dateButtonPressed = false;
      this.createTaskForm.patchValue({due_date: ''});
    }else{
      this.dateButtonPressed = true;
      this.createTaskForm.patchValue({due_date: this.dateNow});
    }
    
  }
}
