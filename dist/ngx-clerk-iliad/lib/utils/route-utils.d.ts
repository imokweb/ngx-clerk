import { UrlSegment } from "@angular/router";
export declare const catchAllRoute: (catchAllPath: string) => (url: UrlSegment[]) => {
    consumed: UrlSegment[];
} | null;
