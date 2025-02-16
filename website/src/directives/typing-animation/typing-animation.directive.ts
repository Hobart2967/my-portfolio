import {
  Directive, OnInit, OnChanges,
  ElementRef, Input, Output,
  EventEmitter, SimpleChanges,
  AfterViewInit,
} from '@angular/core'
import { Observable, Subscription } from 'rxjs';
import { Typed } from './typed';

@Directive({
  selector: '[typingAnimation]'
})
export class TypingAnimationDirective implements OnInit, OnChanges, AfterViewInit {
  public typed: Typed
  @Input('typeSpeed') public typeSpeed: number = 0
  @Input('startDelay') public startDelay: number = 0
  @Input('condition') public condition: boolean = true
  @Input('hideCursorOnComplete') public hideCursorOnComplete: boolean = false
  @Input('noCursorStartDelay') public noCursorStartDelay: boolean = false
  @Input('hideCursorDelay') public hideCursorDelay: number = 0;

  public get text(): string {
      return this.elRef?.nativeElement?.innerText;
  }

  @Output('complete') public complete: EventEmitter<null> = new EventEmitter()
  public typingLock: boolean = false
  public contentObservable: Observable<string> = null;
  public contentSubscription: Subscription = null;

  public constructor (private elRef: ElementRef) {}

  public ngOnInit () {
      if (!this.checkContent()) {
          return
      }
      this.createTyped()
  }

  public ngAfterViewInit () {
      if (this.typed) {
          return
      }

      if (!this.checkContent()) {
          this.contentObservable = new Observable((ob) => {
              if (this.checkContent()) {
                  ob.next(this.text)
                  ob.complete()
              }
          })

          this.contentSubscription = this.contentObservable.subscribe((content) => {
              this.createTyped()
              this.contentSubscription.unsubscribe()
          })

          return
      }

      this.createTyped()
  }

  public ngOnChanges (changes: SimpleChanges) {
      if (('condition' in changes) && this.typed) {
          if (this.typingLock) {
              return
          }
          if (this.condition) {
              this.typed.begin()
              this.typingLock = true
          }
      }

      if ('text' in changes && this.typed) {
          if (this.typingLock) {
              return;
          }
          if (this.condition) {
              this.typed.textContent = this.text;
              this.typed.begin()
              this.typingLock = true
          }
      }
  }


  private checkContent() {
      return this.text;
  }

  private createTyped () {
      this.typed = new Typed(this.elRef.nativeElement, {
          typeSpeed: this.typeSpeed,
          startDelay: this.startDelay,
          condition: this.condition,
          hideCursorOnComplete: this.hideCursorOnComplete,
          hideCursorDelay: this.hideCursorDelay,
          noCursorStartDelay: this.noCursorStartDelay,
          onComplete: () => {
              this.complete.emit(null)
              this.typingLock = false
          }
      },
          this.text
      )

      if (this.condition) {
          this.typed.begin()
          this.typingLock = true
      }
  }
}