[![Build Status](https://travis-ci.org/frontendfreelancerdk/ff-carousel.svg?branch=master)](https://travis-ci.org/frontendfreelancerdk/ff-carousel)

# ff-carousel

##Getting started

### Installation

#####To install this library, run:

```bash
$ npm install ff-carousel --save
```

##### Include to your module
 `AppModule`

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import library
import {FFCarouselModule} from 'ff-carousel';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify library as an import
    FFCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once ff-carousel is imported, you can use its directive in your Angular application:

```xml
<!-- You can now use library component in your.component.html -->
<ff-carousel></ff-carousel>
```

You should put slides (1*), indicators (2*) and arrows (3*) as ng-content:

```angular2html
<ff-carousel>
<!-- (1) You should mark you slide with *ffCarouselItem directive to let ff-carousel know that it's slide -->
<!-- Then you can make your own structure and styles for slide -->
    <div *ffCarouselItem class="slide-wrapper">
      <img src="first_slide_image.jpg" class="slide-img">
      <h2 class="slide-header"></h2>
      <p class="slide-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
         Exercitationem illo mollitia natus nihil
         perspiciatis provident quisquam sunt. Ad eaque quibusdam voluptas! Amet autem blanditiis cupiditate
         dolores in nulla, omnis praesentium.</p>
    </div>
<!-- (2) If you want to use slide indicators you need to add your indicator element 
     and mark it as indicator with *ffCarouselIndicator directive. -->
  <div *ffCarouselIndicator class="indicator">*</div>
<!-- (3) Also if you want to use arrows - just add RIGHT arrow element and mark it with *ffCarouselArrow directive-->
  <div *ffCarouselArrow class="arrow"> ></div>
</ff-carousel>
```

## API

Selector: `ff-carousel`  
Exported as: `FFCarousel`  

#### Properties
```typescript
  @Input() activeId: number = 0;
```
> The [activeId] attribute set current slide by ID.
> To set third slide as active use:
> <ff-carousel activeId="2"></ff-carousel> 

```typescript
  @Input() interval: number = 3000;
```
>  The [interval] attribute binding the time in milliseconds before slide change

```typescript
  @Input() autoplay: boolean = true;
```
>  If [autoplay] is false slider will not switch slides

```typescript
  @Input() pauseOnHover: boolean = true;
```
>  If [pauseOnHover] is true slider will not switch slides while mouse over the slider

```typescript
  @Input() keyboard: boolean = true;
```
>  If [keyboard] is true allows switch slides using keyboard 'arrow left' and 'arrow right'.

```typescript
  @Input() loop: boolean = true;
```
>  If [loop] is true allows switch slides from last slide to first slide.

```typescript
  @Input() showArrows: boolean = true;
```
>  If [showArrows] is true - will show arrows (buttons 'next' and 'previous')

```typescript
  @Input() showIndicators: boolean = false;
```
>  If [showIndicators] is true - will show slides indicators (slider navigation)

```typescript
  @Input() btnOverlay: boolean = false;
```
>  If [btnOverlay] is true will wrap arrows (next and prev) with overlay

```typescript
  @Output() switched: EventEmitter<number>;
```
> Event triggered when slide was switched and send current active slide ID 


#### Methods

```typescript
  next: ()=>: number; 
```
> You can call this method to show next slide. Method returns active slide ID after switched.

```typescript
  prev: ()=>: number; 
```
> You can call this method to show previous slide. Method returns active slide ID after switched.

```typescript
  setActive: (id: number)=>: void; 
```
> For set active slide by ID. E.g from external navigation.

```typescript
  stop: ()=>: void; 
  play: ()=>: void; 
```
> stop and play methods are responsible for autoplay. 

## Example

`app.component.html`
```angular2html
<ff-carousel [btnOverlay]="true" (switched)="switched()" #myCarousel="FFCarousel">
  <ng-container *ngFor="let img of images">
    <div *ffCarouselItem class="imgWrapper">
      <img src="{{img}}" alt="">
    </div>
  </ng-container>
  <div *ffCarouselIndicator class="indicator">*</div>
  <div *ffCarouselArrow class="arrow"> ></div>
</ff-carousel>

<button (click)="myCarousel.prev()">Some external 'prev' button</button>
<button (click)="myCarousel.next()">Some external 'next' button</button>
```

`app.component.css`
```css
.imgWrapper {
  padding-top: 55%;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}

.indicator {
  color: white;
}
.arrow{
  font-size: 30px;
  color: #fff;
}
```

`app.component.ts`
```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'ff-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  images = [1, 2, 3, 4, 5, 6, 7].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  switched(id:number) {
    console.log(`Switched! Current slide is ${id}`);
  }
}
```
## License

MIT © [Frontend Freelancer](mailto:developer@frontend-freelancer.com)
