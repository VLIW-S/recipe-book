import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([AuthInterceptorService]),withInterceptorsFromDi()),
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
};
