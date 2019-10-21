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
import {interval, Observable, Subject} from 'rxjs';
import {fadeIn} from './ff-carousel.animations';
import {takeUntil} from 'rxjs/operators';

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
  private _timer: Observable<number>;
  private _destroy = new Subject<void>();
  private _timerStop = new Subject<void>();
  private _lastLenght: number = 0;
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
  private _autoplay: boolean = true;
  get autoplay(): boolean {
    return this._autoplay;
  }

  @Input() set autoplay(val: boolean) {
    this._autoplay = val;
    this.autoplay ? this.play() : this.stop();
  }

  private _loop: boolean = true;
  get loop(): boolean {
    return this._loop;
  }

  @Input() set loop(val: boolean) {
    this._loop = val;
  }

  @Input() keyboard: boolean = true;
  @Input() interval: number = 3500;

  @Output() switched: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('mouseenter')
  mouseEnter() {
    if (this.pauseOnHover) {
      this.stop();
    }
  }

  @HostListener('mouseleave')
  mouseLeave() {
    if (this.pauseOnHover) {
      this.play();
    }
  }

  @HostListener('keydown.ArrowRight')
  arrowRight() {
    if (this.keyboard) {
      this.next();
    }
  }

  @HostListener('keydown.ArrowLeft')
  arrowLeft() {
    if (this.keyboard) {
      this.prev();
    }
  }

  constructor(@Inject(PLATFORM_ID) private _platformId, private _cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    this.elements = this.items.toArray();
    this._lastLenght = this.items.length || 0;
    if (this.autoplay) {
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
      } else {
        this.stop();
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

  public stop() {
    this._timerStop.next();
  }

  public play() {
    if (this.autoplay) {
      this.resetTimer(this.interval);
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    FFCarouselItemDirective.resetId();
  }

  private resetTimer(value: number): void {
    this._timer = interval(value);
  }

  private startTimer(): void {
    this._timer
      .pipe(
        takeUntil(this._timerStop),
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this.next();
      });
  }

}
