import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild,
  ContentChildren, EventEmitter,
  HostBinding,
  HostListener, Inject,
  Input, NgZone, OnDestroy,
  Output, PLATFORM_ID,
  QueryList
} from '@angular/core';
import {FFCarouselItemDirective} from './ff-carousel-item.directive';
import {FFCarouselIndicatorDirective} from './ff-carousel-indicator.directive';
import {FFCarouselArrowDirective} from './ff-carousel-arrow.directive';
import {BehaviorSubject, Subject} from 'rxjs';
import {fadeIn} from './ff-carousel.animations';

@Component({
  selector: 'ff-carousel',
  templateUrl: 'ff-carousel.component.html',
  styleUrls: ['ff-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'FFCarousel',
  animations: [fadeIn]
})
export class FFCarouselComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
  @ContentChildren(FFCarouselItemDirective) items: QueryList<FFCarouselItemDirective>;
  @ContentChild(FFCarouselIndicatorDirective, {static: false}) indicator: FFCarouselIndicatorDirective;
  @ContentChild(FFCarouselArrowDirective, {static: false}) arrow: FFCarouselArrowDirective;
  @HostBinding('class') hostClass = 'ff-carousel';
  @HostBinding('attr.tabindex') tabindex = '1';

  private _destroy = new Subject<void>();
  private _lastLenght: number = 0;
  private _loopState: boolean = false;
  private _intervalId = null;
  public elements: FFCarouselItemDirective[];

  private _activeId: number = 0;
  get activeId(): number {
    return this._activeId;
  }

  @Input() set activeId(val: number) {
    this._activeId = val;
    this.switched.emit();
  }

  @Input() pauseOnHover: boolean = true;
  @Input() btnOverlay: boolean = true;
  @Input() showArrows: boolean = true;
  @Input() showIndicators: boolean = true;
  private _loop: boolean = true;
  get loop(): boolean {
    return this._loop;
  }

  @Input() set loop(val: boolean) {
    this._loop = val;
    this.loop ? this.play() : this.pause();
  }

  @Input() keyboard: boolean = true;
  @Input() interval: number = 1500;

  @Output() switched: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('mouseenter')
  mouseEnter() {
    this.pauseOnHover && this.pause();
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.pauseOnHover && this.play();
  }

  @HostListener('keydown.ArrowRight', ['$event'])
  arrowRight(e) {
    this.keyboard && this.next();
  }

  @HostListener('keydown.ArrowLeft', ['$event'])
  arrowLeft(e) {
    this.keyboard && this.prev();
  }

  constructor(@Inject(PLATFORM_ID) private _platformId, private _ngZone: NgZone, private _cdr: ChangeDetectorRef) {

  }

  ngAfterContentInit(): void {
    this.elements = this.items.toArray();
    this._lastLenght = this.items.length || 0;
    if (this.loop) {
      this.play();
    }
  }

  ngAfterContentChecked(): void {
    if (this.items && this.items.length && this.items.length !== this._lastLenght) {
      this.elements = this.items.toArray();
      this._cdr.markForCheck();
    }
  }

  public next() {
    if (this.activeId === this.elements.length - 1) {
      if (this.loop) {
        this.activeId = 0;
      }
    } else {
      this.activeId += 1;
    }
  }

  public prev() {
    if (this.activeId === 0) {
      if (this.loop) {
        this.activeId = this.elements.length - 1;
      }
    } else {
      this.activeId -= 1;
    }
  }

  public setActive(id: number) {
    this.activeId = id;
  }

  public pause() {
    this._loopState = false;
    window.clearInterval(this._intervalId);
    this._intervalId = null;
  }

  public play() {
    if (this.loop) {
      this._loopState = true;
      this._intervalId = window.setInterval(() => {
        this.next();
      }, this.interval);
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    FFCarouselItemDirective.resetId();
  }


}
