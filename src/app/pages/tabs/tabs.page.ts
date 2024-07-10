import { Component, EnvironmentInjector, ViewChild, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';
import { StorageService } from 'src/app/services/storage.service';
import { Task } from '../../models/task';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonicModule,
    TaskFormComponent,
    RouterModule 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class TabsPage implements OnInit{
  @ViewChild(IonModal) modal!: IonModal ;
  tab!: string;
  paletteToggle = false;

  constructor(public environmentInjector: EnvironmentInjector, private storage: StorageService) { }


  ngOnInit(): void {
    
   
     // Use matchMedia to check the user preference
     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

     // Initialize the dark palette based on the initial
     // value of the prefers-color-scheme media query
     this.initializeDarkPalette(prefersDark.matches);
     console.log('Device Is dark mode', prefersDark.matches)
 
     // Listen for changes to the prefers-color-scheme media query
     prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
   }

    //LIGTH-DARK MODE
   
   initializeDarkPalette(isDark: boolean) {// Check/uncheck the toggle and update the palette based on isDark
     this.paletteToggle = isDark;
     this.toggleDarkPalette(isDark);  
   }
   
  toggleChange() {// Listen for the toggle check/uncheck to toggle the dark palette
    // 
    if(this.paletteToggle){
      this.paletteToggle = false;
    }else{
      this.paletteToggle = true;
    }
    this.toggleDarkPalette(this.paletteToggle);
  }

  
  toggleDarkPalette(shouldAdd:boolean) {// Add or remove the "ion-palette-dark" class on the html element
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
  
  createTask(task: Task) {
    this.storage.addTask(
      task.name,
      task.description,
      task.priority,
      task.tag,
      task.creation_date,
      task.due_date,
      task.notification_date_range,
      task.notification_date
    );
    this.closeModal();
  }
closeModal() {
  this.modal.dismiss(null, 'cancel');
}
}