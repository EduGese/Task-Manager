import { TestBed } from '@angular/core/testing';

import { TaskStylesService } from './task-styles.service';

describe('TaskStylesService', () => {
  let service: TaskStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
