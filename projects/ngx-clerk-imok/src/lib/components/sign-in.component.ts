import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { take } from 'rxjs';
import { SignInProps } from '@clerk/types';

@Component({
    selector: 'clerk-sign-in',
    imports: [],
    template: `<div #ref></div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class ClerkSignInComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref: ElementRef | null = null; 
  @Input() props: SignInProps | undefined;

  constructor(private _clerk: ClerkService) {}

  ngAfterViewInit() {
    this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
      clerk.mountSignIn(this.ref?.nativeElement, this.props);
    });
  }

  ngOnDestroy() {
    this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
      clerk.unmountSignIn(this.ref?.nativeElement);
    });
  }
}
