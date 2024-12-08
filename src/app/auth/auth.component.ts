import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { SpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponseData } from './auth.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [FormsModule, SpinnerComponent],
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (!this.isLoginMode) {
      authObs = this.authService.signUp(email, password);
    } else {
      authObs = this.authService.signIn(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }
}
