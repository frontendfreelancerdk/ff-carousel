import {Directive, TemplateRef} from '@angular/core';

let id: number = 0;

@Directive({
  selector: '[ffCarouselItem]'
})
export class FFCarouselItemDirective {
  public id: number = id++;

  constructor(public el: TemplateRef<any>) {
  }

  static resetId() {
    id = 0;
  }
}
