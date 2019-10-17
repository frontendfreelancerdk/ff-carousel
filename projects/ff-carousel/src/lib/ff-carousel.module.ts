import {NgModule} from '@angular/core';
import {FFCarouselComponent} from './ff-carousel.component';
import {CommonModule} from '@angular/common';
import {FFCarouselIndicatorDirective} from './ff-carousel-indicator.directive';
import {FFCarouselItemDirective} from './ff-carousel-item.directive';
import {FFCarouselArrowDirective} from './ff-carousel-arrow.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [FFCarouselComponent, FFCarouselIndicatorDirective, FFCarouselItemDirective, FFCarouselArrowDirective],
  imports: [BrowserAnimationsModule, CommonModule],
  exports: [FFCarouselComponent, FFCarouselIndicatorDirective, FFCarouselItemDirective, FFCarouselArrowDirective]
})
export class FFCarouselModule {
}
