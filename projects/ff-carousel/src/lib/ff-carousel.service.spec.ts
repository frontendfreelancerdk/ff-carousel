import { TestBed } from '@angular/core/testing';

import { FfCarouselService } from './ff-carousel.service';

describe('FfCarouselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FfCarouselService = TestBed.get(FfCarouselService);
    expect(service).toBeTruthy();
  });
});
