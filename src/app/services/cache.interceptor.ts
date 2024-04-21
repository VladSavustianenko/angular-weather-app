import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cacheDuration = req.params.get('cacheDuration');
        const clonnedRequest = req.clone({ params: req.params.delete('cacheDuration') });

        if (!cacheDuration) {
            return next.handle(clonnedRequest);
        }

        const cachedData = localStorage.getItem(clonnedRequest.url);
        if (cachedData) {
            const { value, expiration } = JSON.parse(cachedData);

            if (expiration && (Date.now() < expiration)) {
                return of(new HttpResponse({ body: value }));
            }
            
            localStorage.removeItem(clonnedRequest.url);
        }

        return next.handle(clonnedRequest).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    const expiration = Date.now() + parseInt(cacheDuration, 10) * 1000;
                    const dataToStore = JSON.stringify({ value: event.body, expiration });
                    localStorage.setItem(clonnedRequest.url, dataToStore);
                }
            })
        );
    }
}