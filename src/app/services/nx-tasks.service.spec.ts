import { TestBed } from '@angular/core/testing';

import { NxTasksService } from './nx-tasks.service';

describe('NxTasksService', () => {
  let service: NxTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
