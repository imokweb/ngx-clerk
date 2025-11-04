import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { UserProfileProps } from '@clerk/types';
import * as i0 from "@angular/core";
export declare class ClerkUserProfileComponent implements AfterViewInit, OnDestroy {
    private _clerk;
    ref: ElementRef | null;
    props: UserProfileProps | undefined;
    constructor(_clerk: ClerkService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkUserProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClerkUserProfileComponent, "clerk-user-profile", never, { "props": { "alias": "props"; "required": false; }; }, {}, never, never, true, never>;
}
