import { TestBed } from '@angular/core/testing';

import { MediaPlusApiService } from './media-plus-api.service';

describe('MediaPlusApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaPlusApiService = TestBed.get(MediaPlusApiService);
    expect(service).toBeTruthy();
  });
});
