import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: currentUser.token
                }
            });
        }

        return next.handle(request);
    }
}

export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
};
