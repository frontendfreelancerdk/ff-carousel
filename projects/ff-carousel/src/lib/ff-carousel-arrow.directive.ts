import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ffCarouselArrow]'
})
export class FFCarouselArrowDirective {

  constructor(public el: TemplateRef<any>) { }

}
