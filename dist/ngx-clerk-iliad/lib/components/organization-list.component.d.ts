import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { OrganizationListProps } from '@clerk/types';
import * as i0 from "@angular/core";
export declare class ClerkOrganizationListComponent implements AfterViewInit, OnDestroy {
    private _clerk;
    ref: ElementRef | null;
    props: OrganizationListProps | undefined;
    constructor(_clerk: ClerkService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkOrganizationListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClerkOrganizationListComponent, "clerk-organization-list", never, { "props": { "alias": "props"; "required": false; }; }, {}, never, never, true, never>;
}
