import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

type Props = {
  /** Where your app should land after the OAuth completes */
  fallbackRedirectUrl?: string; // e.g. '/home/categories'
};

@Component({
  selector: 'clerk-sign-in-native',
  templateUrl: './sign-in-native.component.html',
})
export class ClerkSignInNativeComponent {
  @Input() props: Props = { fallbackRedirectUrl: '/home/categories' };

  // WHITE env (swap to prod later)
  private readonly appHost = 'https://white.geoforager.com';
  private readonly accountsHost = 'https://accounts.geoforager.com';

  busy = false;
  error = '';

  constructor(private router: Router) {}

  private isIos(): boolean {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || navigator.vendor || '';
    return /iPad|iPhone|iPod/i.test(ua);
  }

  private isCapacitorIos(): boolean {
    if (typeof window === 'undefined') return false;
    const cap: any = (window as any).Capacitor;
    try {
      const platform = cap?.getPlatform?.();
      return platform === 'ios';
    } catch {
      return false;
    }
  }

  async openHostedSignIn(): Promise<void> {
    this.error = '';

    // Guard: only use the native flow on iOS; others can keep the web component
    if (!this.isIos()) {
      // Fallback to your existing route that shows the web Clerk widget
      await this.router.navigateByUrl('/auth/sign-in');
      return;
    }

    this.busy = true;
    const LOG = (msg: string, data?: any) =>
      console.log('[clerk-sign-in-native]', msg, data ?? '');

    try {
      // 1) Build the hosted Clerk Sign-In URL
      //    We include both "redirect_url" and "after_sign_in_url" – Clerk accepts either
      const callbackUrl = `${this.appHost}/auth/callback`;
      const startUrl = new URL(`${this.accountsHost}/sign-in`);
      const state = crypto.getRandomValues(new Uint32Array(4)).join('-');

      startUrl.searchParams.set('redirect_url', callbackUrl);
      startUrl.searchParams.set('after_sign_in_url', callbackUrl);
      startUrl.searchParams.set('state', state);

      // 2) Prefer ASWebAuthenticationSession when running inside a Capacitor iOS app
      if (this.isCapacitorIos()) {
        try {
          const cap: any = (window as any).Capacitor;
          const CapacitorWebAuth = cap?.Plugins?.CapacitorWebAuth;
          if (CapacitorWebAuth?.login) {
            const { value: finalUrl } = await CapacitorWebAuth.login({
              url: startUrl.toString(),
              redirectScheme: 'https',
            });
            LOG('ASWebAuth finished with URL', finalUrl);

            // Basic validation + navigate to in-app callback
            const cb = new URL(finalUrl);
            if (cb.origin !== this.appHost) {
              throw new Error(`Unexpected callback origin: ${cb.origin}`);
            }
            const returnedState = cb.searchParams.get('state') ?? '';
            if (returnedState && returnedState !== state) {
              throw new Error('State mismatch from auth callback');
            }
            await this.router.navigateByUrl(`/auth/callback${cb.search}`);
            return;
          } else {
            LOG('CapacitorWebAuth plugin not found, falling back to window.location');
          }
        } catch (nativeErr: any) {
          LOG('ASWebAuth unavailable, falling back to window.location', nativeErr?.message || nativeErr);
        }
      }

      LOG('Opening sign-in URL in current window', startUrl.toString());
      if (typeof window !== 'undefined') {
        window.location.href = startUrl.toString();
      }
      // Note: the app is expected to receive the universal link back to `${this.appHost}/auth/callback`.
    } catch (err: any) {
      const msg = (err && err.message) || String(err);
      const cancelled = /cancel/i.test(msg);
      this.error = cancelled ? 'Sign-in cancelled.' : 'Sign-in failed. Try again.';
      LOG('Auth error', { msg });
    } finally {
      this.busy = false;
    }
  }
}
