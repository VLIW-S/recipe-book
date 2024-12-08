import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { AuthResponseData } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private tokenExpirationTimer: any;
  user = new BehaviorSubject<User>(null);

  signUp(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5w6LkWVK6O9LgzBc-uKbGAgHqHAzZ9vo`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5w6LkWVK6O9LgzBc-uKbGAgHqHAzZ9vo',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(resError: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!resError.error || !resError.error.error) {
      return throwError(errorMessage);
    }

    switch (resError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account!';
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project!';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted!';
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password!';
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator!';
        break;
    }
    return throwError(errorMessage);
  }
}
