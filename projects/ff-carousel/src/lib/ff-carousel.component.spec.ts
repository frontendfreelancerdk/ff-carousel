import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfCarouselComponent } from './ff-carousel.component';

describe('FfCarouselComponent', () => {
  let component: FfCarouselComponent;
  let fixture: ComponentFixture<FfCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
