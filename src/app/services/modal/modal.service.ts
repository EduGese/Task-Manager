import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalTrigger =  new BehaviorSubject(false);
  currentModalTrigger = this.modalTrigger.asObservable();

  constructor() { }

  changeModalTrigger(trigger: boolean) {
    this.modalTrigger.next(trigger)
    console.log('Modal trigger is now: ', trigger);
  } 
}
