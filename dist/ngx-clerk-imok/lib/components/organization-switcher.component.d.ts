import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { OrganizationSwitcherProps } from '@clerk/types';
import * as i0 from "@angular/core";
export declare class ClerkOrganizationSwitcherComponent implements AfterViewInit, OnDestroy {
    private _clerk;
    ref: ElementRef | null;
    props: OrganizationSwitcherProps | undefined;
    constructor(_clerk: ClerkService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkOrganizationSwitcherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClerkOrganizationSwitcherComponent, "clerk-organization-switcher", never, { "props": { "alias": "props"; "required": false; }; }, {}, never, never, true, never>;
}
