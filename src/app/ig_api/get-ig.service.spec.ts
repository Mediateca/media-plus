import { TestBed } from '@angular/core/testing';

import { GetIgService } from './get-ig.service';

describe('GetIgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetIgService = TestBed.get(GetIgService);
    expect(service).toBeTruthy();
  });
});
