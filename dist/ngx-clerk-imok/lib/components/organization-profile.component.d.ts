import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { OrganizationProfileProps } from '@clerk/types';
import * as i0 from "@angular/core";
export declare class ClerkOrganizationProfileComponent implements AfterViewInit, OnDestroy {
    private readonly _clerk;
    ref: ElementRef | null;
    props: OrganizationProfileProps | undefined;
    constructor(_clerk: ClerkService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkOrganizationProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClerkOrganizationProfileComponent, "clerk-organization-profile", never, { "props": { "alias": "props"; "required": false; }; }, {}, never, never, true, never>;
}
