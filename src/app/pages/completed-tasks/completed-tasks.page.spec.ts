import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedTasksPage } from './completed-tasks.page';

describe('CompletedTaskPage', () => {
  let component: CompletedTasksPage;
  let fixture: ComponentFixture<CompletedTasksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
