import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskFilterService {
  private filterTypeSubject = new BehaviorSubject<string>('Pending'); // Valor inicial
  filterType$ = this.filterTypeSubject.asObservable()
  constructor() { }
  setFilterType(filterType: string) {
    this.filterTypeSubject.next(filterType);
  }
  getFilterType() {
    return this.filterTypeSubject.value; 
  }
}
