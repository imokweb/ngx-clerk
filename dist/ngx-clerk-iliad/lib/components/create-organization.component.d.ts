import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ClerkService } from '../services/clerk.service';
import { CreateOrganizationProps } from '@clerk/types';
import * as i0 from "@angular/core";
export declare class ClerkCreateOrganizationComponent implements AfterViewInit, OnDestroy {
    private _clerk;
    ref: ElementRef | null;
    props: CreateOrganizationProps | undefined;
    constructor(_clerk: ClerkService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkCreateOrganizationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClerkCreateOrganizationComponent, "clerk-create-organization", never, { "props": { "alias": "props"; "required": false; }; }, {}, never, never, true, never>;
}
