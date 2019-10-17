import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 1, transform: 'translate(100%)'}),
    animate('0.3s', style({opacity: 1, transform: 'translate(0)'})),
  ]),
  transition(':leave', [
    animate('0.3s', style({opacity: 1,  transform: 'translate(-100%)'}))
  ])
]);
