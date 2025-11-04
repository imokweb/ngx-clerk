import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { SignInProps } from '@clerk/types';
import * as i0 from "@angular/core";
export declare class ClerkSignInComponent implements AfterViewInit, OnDestroy {
    private _clerk;
    ref: ElementRef | null;
    props: SignInProps | undefined;
    constructor(_clerk: ClerkService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkSignInComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClerkSignInComponent, "clerk-sign-in", never, { "props": { "alias": "props"; "required": false; }; }, {}, never, never, true, never>;
}
