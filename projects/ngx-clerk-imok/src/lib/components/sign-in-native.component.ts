import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { take } from 'rxjs';
import { SignInRedirectOptions } from '@clerk/types';

/**
 * Native Sign-In component
 *
 * This component triggers Clerk's redirect-based Sign In flow as soon as it mounts.
 * The redirect flow is better suited for native/hybrid environments (e.g., iOS)
 * where authentication should occur in the system browser (ASWebAuthenticationSession)
 * instead of an embedded WebView.
 */
@Component({
  selector: 'clerk-sign-in-native',
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class ClerkSignInNativeComponent implements AfterViewInit {
  /**
   * Options forwarded to Clerk.redirectToSignIn
   */
  @Input() props: SignInRedirectOptions | undefined;

  constructor(private _clerk: ClerkService) {}

  ngAfterViewInit() {
    // Use redirect flow so iOS can open the system default browser
    this._clerk.redirectToSignIn(this.props);
  }
}
