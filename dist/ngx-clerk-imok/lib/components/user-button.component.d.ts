import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { UserButtonProps } from '@clerk/types';
import * as i0 from "@angular/core";
export declare class ClerkUserButtonComponent implements AfterViewInit, OnDestroy {
    private _clerk;
    ref: ElementRef | null;
    props: UserButtonProps | undefined;
    constructor(_clerk: ClerkService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkUserButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClerkUserButtonComponent, "clerk-user-button", never, { "props": { "alias": "props"; "required": false; }; }, {}, never, never, true, never>;
}
