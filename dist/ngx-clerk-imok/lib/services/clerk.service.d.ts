import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSessionResource, Clerk, ClerkOptions, ClientResource, CreateOrganizationProps, OrganizationProfileProps, OrganizationResource, SignInProps, SignInRedirectOptions, SignUpProps, SignUpRedirectOptions, UserProfileProps, UserResource, Without } from '@clerk/types';
import { ReplaySubject } from 'rxjs';
import { ClerkInitOptions } from '../utils/types';
import * as i0 from "@angular/core";
interface HeadlessBrowserClerk extends Clerk {
    load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>;
    updateClient: (client: ClientResource) => void;
}
interface BrowserClerk extends HeadlessBrowserClerk {
    onComponentsReady: Promise<void>;
    components: any;
}
declare global {
    interface Window {
        Clerk: HeadlessBrowserClerk | BrowserClerk;
    }
}
export declare class ClerkService {
    private platformId;
    private _router;
    private _ngZone;
    readonly clerk$: ReplaySubject<HeadlessBrowserClerk | BrowserClerk>;
    readonly client$: ReplaySubject<ClientResource | undefined>;
    readonly session$: ReplaySubject<ActiveSessionResource | undefined | null>;
    readonly user$: ReplaySubject<UserResource | undefined | null>;
    readonly organization$: ReplaySubject<OrganizationResource | undefined | null>;
    private _initialized;
    constructor(platformId: Object, _router: Router, _ngZone: NgZone);
    __init(options: ClerkInitOptions): void;
    updateAppearance(opts: ClerkOptions['appearance']): void;
    updateLocalization(opts: ClerkOptions['localization']): void;
    openSignIn(opts?: SignInProps): void;
    closeSignIn(): void;
    openSignUp(opts?: SignUpProps): void;
    closeSignUp(): void;
    openUserProfile(opts?: UserProfileProps): void;
    closeUserProfile(): void;
    openOrganizationProfile(opts?: OrganizationProfileProps): void;
    closeOrganizationProfile(): void;
    openCreateOrganization(opts?: CreateOrganizationProps): void;
    closeCreateOrganization(): void;
    redirectToSignIn(opts?: SignInRedirectOptions): void;
    redirectToSignUp(opts?: SignUpRedirectOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClerkService>;
}
export {};
