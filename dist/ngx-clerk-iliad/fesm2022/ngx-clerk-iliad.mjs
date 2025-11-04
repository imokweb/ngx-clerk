import * as i0 from '@angular/core';
import { PLATFORM_ID, Inject, Injectable, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { ReplaySubject, take, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { parsePublishableKey } from '@clerk/shared/keys';
import { loadScript } from '@clerk/shared/loadScript';
import * as i1 from '@angular/router';
export * from '@clerk/types';

const FAILED_TO_LOAD_ERROR = 'Clerk: Failed to load Clerk';
const loadClerkJsScript = (opts) => {
    const { publishableKey } = opts;
    if (!publishableKey) {
        throw new Error('ClerkService requires a publishableKey');
    }
    return loadScript(clerkJsScriptUrl(opts), {
        async: true,
        crossOrigin: 'anonymous',
        beforeLoad: applyClerkJsScriptAttributes(opts),
    }).catch(() => {
        throw new Error(FAILED_TO_LOAD_ERROR);
    });
};
const clerkJsScriptUrl = (opts) => {
    const { clerkJSUrl, clerkJSVariant, clerkJSVersion = '5', publishableKey } = opts;
    if (clerkJSUrl) {
        return clerkJSUrl;
    }
    const scriptHost = parsePublishableKey(publishableKey)?.frontendApi || '';
    const variant = clerkJSVariant ? `${clerkJSVariant.replace(/\.+$/, '')}.` : '';
    return `https://${scriptHost}/npm/@clerk/clerk-js@${clerkJSVersion}/dist/clerk.${variant}browser.js`;
};
const applyClerkJsScriptAttributes = (options) => (script) => {
    const { publishableKey } = options;
    if (publishableKey) {
        script.setAttribute('data-clerk-publishable-key', publishableKey);
    }
};

// declare global {
//   interface Window {
//     readonly Clerk: HeadlessBrowserClerk | BrowserClerk;
//   }
// }
// declare global {
//   interface Window {
//     Clerk: any;
//   }
// }
class ClerkService {
    constructor(platformId, _router, _ngZone) {
        this.platformId = platformId;
        this._router = _router;
        this._ngZone = _ngZone;
        this.clerk$ = new ReplaySubject(1);
        this.client$ = new ReplaySubject(1);
        this.session$ = new ReplaySubject(1);
        this.user$ = new ReplaySubject(1);
        this.organization$ = new ReplaySubject(1);
        this._initialized = false;
    }
    __init(options) {
        if (!isPlatformBrowser(this.platformId)) {
            // ClerkService can only be used in the browser
            return;
        }
        if (this._initialized) {
            console.warn('ClerkService already initialized');
            return;
        }
        this._initialized = true;
        loadClerkJsScript(options).then(async () => {
            await window.Clerk.load({
                routerPush: (to) => this._ngZone.run(() => {
                    const url = new URL(to.replace('#/', ''), 'http://dummy.clerk');
                    const queryParams = Object.fromEntries(url.searchParams.entries());
                    return this._router.navigate([url.pathname], { queryParams });
                }),
                routerReplace: (to) => this._ngZone.run(() => {
                    const url = new URL(to.replace('#/', ''), 'http://dummy.clerk');
                    const queryParams = Object.fromEntries(url.searchParams.entries());
                    return this._router.navigate([url.pathname], { queryParams, replaceUrl: true });
                }),
                ...options
            });
            this.client$.next(window.Clerk.client);
            this.session$.next(window.Clerk.session);
            this.user$.next(window.Clerk.user);
            this.organization$.next(window.Clerk.organization);
            // emits all of them every time 1 thing changes
            window.Clerk.addListener((resources) => {
                this.client$.next(resources.client);
                this.session$.next(resources.session);
                this.user$.next(resources.user);
                this.organization$.next(resources.organization);
                this.clerk$.next(window.Clerk);
            });
            this.clerk$.next(window.Clerk);
        });
    }
    updateAppearance(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.__unstable__updateProps({ appearance: opts });
        });
    }
    updateLocalization(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.__unstable__updateProps({ localization: opts });
        });
    }
    openSignIn(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.openSignIn(opts);
        });
    }
    closeSignIn() {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.closeSignIn();
        });
    }
    openSignUp(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.openSignUp(opts);
        });
    }
    closeSignUp() {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.closeSignUp();
        });
    }
    openUserProfile(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.openUserProfile(opts);
        });
    }
    closeUserProfile() {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.closeUserProfile();
        });
    }
    openOrganizationProfile(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.openOrganizationProfile(opts);
        });
    }
    closeOrganizationProfile() {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.closeOrganizationProfile();
        });
    }
    openCreateOrganization(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.openCreateOrganization(opts);
        });
    }
    closeCreateOrganization() {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.closeCreateOrganization();
        });
    }
    redirectToSignIn(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.redirectToSignIn(opts);
        });
    }
    redirectToSignUp(opts) {
        this.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.redirectToSignUp(opts);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkService, deps: [{ token: PLATFORM_ID }, { token: i1.Router }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i1.Router }, { type: i0.NgZone }] });

class ClerkSignInComponent {
    constructor(_clerk) {
        this._clerk = _clerk;
        this.ref = null;
    }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkSignInComponent, deps: [{ token: ClerkService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ClerkSignInComponent, isStandalone: true, selector: "clerk-sign-in", inputs: { props: "props" }, viewQueries: [{ propertyName: "ref", first: true, predicate: ["ref"], descendants: true }], ngImport: i0, template: `<div #ref></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkSignInComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'clerk-sign-in',
                    imports: [],
                    template: `<div #ref></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: ClerkService }], propDecorators: { ref: [{
                type: ViewChild,
                args: ['ref']
            }], props: [{
                type: Input
            }] } });

class ClerkSignUpComponent {
    constructor(_clerk) {
        this._clerk = _clerk;
        this.ref = null;
    }
    ngAfterViewInit() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.mountSignUp(this.ref?.nativeElement, this.props);
        });
    }
    ngOnDestroy() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.unmountSignUp(this.ref?.nativeElement);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkSignUpComponent, deps: [{ token: ClerkService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ClerkSignUpComponent, isStandalone: true, selector: "clerk-sign-up", inputs: { props: "props" }, viewQueries: [{ propertyName: "ref", first: true, predicate: ["ref"], descendants: true }], ngImport: i0, template: `<div #ref></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkSignUpComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'clerk-sign-up',
                    imports: [],
                    template: `<div #ref></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: ClerkService }], propDecorators: { ref: [{
                type: ViewChild,
                args: ['ref']
            }], props: [{
                type: Input
            }] } });

class ClerkUserProfileComponent {
    constructor(_clerk) {
        this._clerk = _clerk;
        this.ref = null;
    }
    ngAfterViewInit() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.mountUserProfile(this.ref?.nativeElement, this.props);
        });
    }
    ngOnDestroy() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.unmountUserProfile(this.ref?.nativeElement);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkUserProfileComponent, deps: [{ token: ClerkService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ClerkUserProfileComponent, isStandalone: true, selector: "clerk-user-profile", inputs: { props: "props" }, viewQueries: [{ propertyName: "ref", first: true, predicate: ["ref"], descendants: true }], ngImport: i0, template: `<div #ref></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkUserProfileComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'clerk-user-profile',
                    imports: [],
                    template: `<div #ref></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: ClerkService }], propDecorators: { ref: [{
                type: ViewChild,
                args: ['ref']
            }], props: [{
                type: Input
            }] } });

class ClerkUserButtonComponent {
    constructor(_clerk) {
        this._clerk = _clerk;
        this.ref = null;
    }
    ngAfterViewInit() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.mountUserButton(this.ref?.nativeElement, this.props);
        });
    }
    ngOnDestroy() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.unmountUserButton(this.ref?.nativeElement);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkUserButtonComponent, deps: [{ token: ClerkService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ClerkUserButtonComponent, isStandalone: true, selector: "clerk-user-button", inputs: { props: "props" }, viewQueries: [{ propertyName: "ref", first: true, predicate: ["ref"], descendants: true }], ngImport: i0, template: `<div #ref></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkUserButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'clerk-user-button',
                    imports: [],
                    template: `<div #ref></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: () => [{ type: ClerkService }], propDecorators: { ref: [{
                type: ViewChild,
                args: ['ref']
            }], props: [{
                type: Input
            }] } });

class ClerkOrganizationProfileComponent {
    constructor(_clerk) {
        this._clerk = _clerk;
        this.ref = null;
    }
    ngAfterViewInit() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.mountOrganizationProfile(this.ref?.nativeElement, this.props);
        });
    }
    ngOnDestroy() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.unmountOrganizationProfile(this.ref?.nativeElement);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkOrganizationProfileComponent, deps: [{ token: ClerkService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ClerkOrganizationProfileComponent, isStandalone: true, selector: "clerk-organization-profile", inputs: { props: "props" }, viewQueries: [{ propertyName: "ref", first: true, predicate: ["ref"], descendants: true }], ngImport: i0, template: `<div #ref></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkOrganizationProfileComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'clerk-organization-profile',
                    imports: [],
                    template: `<div #ref></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: () => [{ type: ClerkService }], propDecorators: { ref: [{
                type: ViewChild,
                args: ['ref']
            }], props: [{
                type: Input
            }] } });

class ClerkOrganizationSwitcherComponent {
    constructor(_clerk) {
        this._clerk = _clerk;
        this.ref = null;
    }
    ngAfterViewInit() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.mountOrganizationSwitcher(this.ref?.nativeElement, this.props);
        });
    }
    ngOnDestroy() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.unmountOrganizationSwitcher(this.ref?.nativeElement);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkOrganizationSwitcherComponent, deps: [{ token: ClerkService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ClerkOrganizationSwitcherComponent, isStandalone: true, selector: "clerk-organization-switcher", inputs: { props: "props" }, viewQueries: [{ propertyName: "ref", first: true, predicate: ["ref"], descendants: true }], ngImport: i0, template: `<div #ref></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkOrganizationSwitcherComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'clerk-organization-switcher',
                    imports: [],
                    template: `<div #ref></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: () => [{ type: ClerkService }], propDecorators: { ref: [{
                type: ViewChild,
                args: ['ref']
            }], props: [{
                type: Input
            }] } });

class ClerkCreateOrganizationComponent {
    constructor(_clerk) {
        this._clerk = _clerk;
        this.ref = null;
    }
    ngAfterViewInit() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.mountCreateOrganization(this.ref?.nativeElement, this.props);
        });
    }
    ngOnDestroy() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.unmountCreateOrganization(this.ref?.nativeElement);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkCreateOrganizationComponent, deps: [{ token: ClerkService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ClerkCreateOrganizationComponent, isStandalone: true, selector: "clerk-create-organization", inputs: { props: "props" }, viewQueries: [{ propertyName: "ref", first: true, predicate: ["ref"], descendants: true }], ngImport: i0, template: `<div #ref></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkCreateOrganizationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'clerk-create-organization',
                    imports: [],
                    template: `<div #ref></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: () => [{ type: ClerkService }], propDecorators: { ref: [{
                type: ViewChild,
                args: ['ref']
            }], props: [{
                type: Input
            }] } });

class ClerkOrganizationListComponent {
    constructor(_clerk) {
        this._clerk = _clerk;
        this.ref = null;
    }
    ngAfterViewInit() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.mountOrganizationList(this.ref?.nativeElement, this.props);
        });
    }
    ngOnDestroy() {
        this._clerk.clerk$.pipe(take(1)).subscribe((clerk) => {
            clerk.unmountOrganizationList(this.ref?.nativeElement);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkOrganizationListComponent, deps: [{ token: ClerkService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ClerkOrganizationListComponent, isStandalone: true, selector: "clerk-organization-list", inputs: { props: "props" }, viewQueries: [{ propertyName: "ref", first: true, predicate: ["ref"], descendants: true }], ngImport: i0, template: `<div #ref></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkOrganizationListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'clerk-organization-list',
                    imports: [],
                    template: `<div #ref></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: () => [{ type: ClerkService }], propDecorators: { ref: [{
                type: ViewChild,
                args: ['ref']
            }], props: [{
                type: Input
            }] } });

class ClerkAuthGuardService {
    constructor(_clerk, _router) {
        this._clerk = _clerk;
        this._router = _router;
    }
    canActivate(route, state) {
        return this._clerk.user$.pipe(take(1), map(user => {
            if (!user?.id) {
                this._clerk.redirectToSignIn({ signInFallbackRedirectUrl: state.url });
                return false;
            }
            if (state.url.includes('__clerk_db_jwt') || state.url.includes('__clerk_handshake')) {
                const url = state.url.split('?');
                const searchParams = new URLSearchParams(url[1]);
                searchParams.delete('__clerk_db_jwt');
                searchParams.delete('__clerk_handshake');
                const newUrl = url[0] + (searchParams.toString() ? '?' + searchParams.toString() : '');
                this._router.navigateByUrl(newUrl, { replaceUrl: true });
                return false;
            }
            return true;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkAuthGuardService, deps: [{ token: ClerkService }, { token: i1.Router }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkAuthGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClerkAuthGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: ClerkService }, { type: i1.Router }] });

const catchAllRoute = (catchAllPath) => (url) => url?.[0]?.path.startsWith(catchAllPath) ? ({ consumed: url }) : null;

// Clerk Components

/**
 * Generated bundle index. Do not edit.
 */

export { ClerkAuthGuardService, ClerkCreateOrganizationComponent, ClerkOrganizationListComponent, ClerkOrganizationProfileComponent, ClerkOrganizationSwitcherComponent, ClerkService, ClerkSignInComponent, ClerkSignUpComponent, ClerkUserButtonComponent, ClerkUserProfileComponent, catchAllRoute };
//# sourceMappingURL=ngx-clerk-iliad.mjs.map
