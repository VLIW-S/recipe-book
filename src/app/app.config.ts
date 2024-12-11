import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app-routing';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { provideStore } from '@ngrx/store';
import { stateReducer } from './store/recipes.reducer';
import { provideEffects } from '@ngrx/effects';
import { RecipesEffects } from './store/recipes.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([AuthInterceptorService]),withInterceptorsFromDi()),
    provideStore({state: stateReducer}),
    provideEffects(RecipesEffects)
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
};
