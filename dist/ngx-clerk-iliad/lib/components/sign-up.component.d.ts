import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { SignUpProps } from '@clerk/types';
import * as i0 from "@angular/core";
export declare class ClerkSignUpComponent implements AfterViewInit, OnDestroy {
    private _clerk;
    ref: ElementRef | null;
    props: SignUpProps | undefined;
    constructor(_clerk: ClerkService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkSignUpComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClerkSignUpComponent, "clerk-sign-up", never, { "props": { "alias": "props"; "required": false; }; }, {}, never, never, true, never>;
}
