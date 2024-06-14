import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  
  constructor(private formBuilder: FormBuilder) { 
    
  }
  ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      id:0,
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      priority: new FormControl('M'),
      tag: new FormControl('Work'),
      done:false
    });
  }
  createTask() {
    if(this.createTaskForm.valid){
    this.taskEmitted.emit(this.createTaskForm.value);
    }else{
      alert('Name field is mandatory');
    }
  }
}
