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
import {BehaviorSubject, combineLatest, NEVER, Subject, Subscription, timer} from 'rxjs';
import {fadeIn} from './ff-carousel.animations';
import {distinctUntilChanged, map, switchMap, takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

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
  private _activeId: number = 0;

  get activeId(): number {
    return this._activeId;
  }

  @Input() set activeId(val: number) {
    this._activeId = val;
    this._cdr.markForCheck();
    this.switched.emit(this._activeId);
  }

  private _interval: BehaviorSubject<number> = new BehaviorSubject(3000);
  get interval(): number {
    return this._interval.value;
  }

  @Input() set interval(val: number) {
    this._interval.next(val);
  }

  private _autoplay: BehaviorSubject<boolean> = new BehaviorSubject(true);
  get autoplay(): boolean {
    return this._autoplay.value;
  }

  @Input() set autoplay(val: boolean) {
    this._autoplay.next(val);
  }

  private _pauseOnHover: BehaviorSubject<boolean> = new BehaviorSubject(true);
  get pauseOnHover(): boolean {
    return this._pauseOnHover.value;
  }

  @Input() set pauseOnHover(val: boolean) {
    this._pauseOnHover.next(val);
  }

  private _mouseHover: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get mouseHover(): boolean {
    return this._mouseHover.value;
  }

  set mouseHover(val: boolean) {
    this._mouseHover.next(val);
  }

  private _pause: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get pause(): boolean {
    return this._pause.value;
  }

  set pause(val: boolean) {
    this._pause.next(val);
  }

  private _keyboard: boolean;
  get keyboard(): boolean {
    return this._keyboard;
  }

  @Input() set keyboard(val: boolean) {
    this._keyboard = val;
  }

  private _loop: BehaviorSubject<boolean> = new BehaviorSubject(true);
  get loop(): boolean {
    return this._loop.value;
  }

  @Input() set loop(val: boolean) {
    this._loop.next(val);
  }

  private _showArrows: boolean = true;
  get showArrows(): boolean {
    return this._showArrows;
  }

  @Input() set showArrows(val: boolean) {
    this._showArrows = val;
  }

  private _showIndicators: boolean;
  get showIndicators(): boolean {
    return this._showIndicators;
  }

  @Input() set showIndicators(val: boolean) {
    this._showIndicators = val;
  }

  private _btnOverlay: boolean;
  get btnOverlay(): boolean {
    return this._btnOverlay;
  }

  @Input() set btnOverlay(val: boolean) {
    this._btnOverlay = val;
  }


  @Output() switched: EventEmitter<number> = new EventEmitter<number>();

  @HostListener('mouseenter')
  mouseEnter() {
    this.mouseHover = true;
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.mouseHover = false;
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

  constructor(@Inject(PLATFORM_ID) private _platformId, private _cdr: ChangeDetectorRef, private zone: NgZone) {
  }

  private _getItemById(id: number) {
    return this.items.find(item => item.id === id);
  }

  ngAfterContentInit(): void {
    FFCarouselItemDirective.resetId();
    if (this.items && this.items.first) {
      this.activeId = this.items.first.id;
    } else {
      this.activeId = 0;
    }
    if (isPlatformBrowser(this._platformId)) {
      this.zone.runOutsideAngular(() => {
        this._loop.subscribe((val) => {
          if (val && this.pause) {
            this.play();
          }
        });
        combineLatest(this._pause, this._pauseOnHover, this._mouseHover, this._interval, this._autoplay)
          .pipe(
            map(([pause, pauseOnHover, mouseHover, _interval, autoplay]) =>
              (!autoplay || (pause || (pauseOnHover && mouseHover)) ? 0 : _interval)),

            distinctUntilChanged(), switchMap(_interval => _interval > 0 ? timer(_interval, _interval) : NEVER),
            takeUntil(this._destroy))
          .subscribe(() => {
            this.zone.run(() => {
              this.next();
            });
          });
      });
    }
  }

  ngAfterContentChecked(): void {

  }

  public next = () => {
    if (this.activeId === this.items.last.id) {
      if (this.loop) {
        this.activeId = this.items.first.id;
      }
    } else {
      this.activeId += 1;
    }
    return this.activeId;
  };

  public prev() {
    if (this.activeId === this.items.first.id) {
      if (this.loop) {
        this.activeId = this.items.last.id;
      }
    } else {
      this.activeId -= 1;
    }
    return this.activeId;
  }

  public setActive(id: number) {
    this.activeId = id;
  }

  public stop() {
    this.pause = true;
  }

  public play() {
    this.pause = false;
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    FFCarouselItemDirective.resetId();
  }

}
