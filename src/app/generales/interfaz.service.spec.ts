import { TestBed } from '@angular/core/testing';

import { InterfazService } from './interfaz.service';

describe('InterfazService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterfazService = TestBed.get(InterfazService);
    expect(service).toBeTruthy();
  });
});
