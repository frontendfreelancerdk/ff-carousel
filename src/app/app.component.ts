import {Component} from '@angular/core';

@Component({
  selector: 'ff-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  images = [1, 2, 3, 4, 5, 6, 7].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  switched() {
    console.log('switched');
  }

  constructor() {
    /*setInterval(() => {
      this.images.push(`https://picsum.photos/900/500?random&t=${Math.random()}`);
    }, 5000);*/
  }
}
