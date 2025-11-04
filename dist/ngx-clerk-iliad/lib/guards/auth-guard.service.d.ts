import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ClerkService } from "../services/clerk.service";
import * as i0 from "@angular/core";
export declare class ClerkAuthGuardService implements CanActivate {
    private readonly _clerk;
    private readonly _router;
    constructor(_clerk: ClerkService, _router: Router);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClerkAuthGuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClerkAuthGuardService>;
}
