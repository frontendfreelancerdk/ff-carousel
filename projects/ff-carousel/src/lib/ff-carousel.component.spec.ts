import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FFCarouselComponent} from './ff-carousel.component';
import {FFCarouselItemDirective} from './ff-carousel-item.directive';

describe('FFCarouselComponent', () => {
  let component: FFCarouselComponent;
  let fixture: ComponentFixture<FFCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FFCarouselComponent, FFCarouselItemDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FFCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
