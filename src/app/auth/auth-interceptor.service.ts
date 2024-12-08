import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

/*
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
*/

export const AuthInterceptorService: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      }
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token),
      });
      return next(modifiedReq);
    })
  );
};
