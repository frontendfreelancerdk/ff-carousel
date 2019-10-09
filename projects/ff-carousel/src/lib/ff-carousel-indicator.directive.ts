import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ffCarouselIndicator]'
})
export class FFCarouselIndicatorDirective {

  constructor(public el: TemplateRef<any>) { }

}
