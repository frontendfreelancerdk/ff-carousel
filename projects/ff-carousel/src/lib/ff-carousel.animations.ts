import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';


export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 1}),
    animate(1000)
  ]),
  transition(':leave', [
    animate(1000, style({opacity: 0}))
  ])
]);
