import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { SpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponseData } from './auth.interface';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [
    FormsModule,
    SpinnerComponent,
    PlaceholderDirective,
  ],
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  closeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: true })
  alertHost: PlaceholderDirective;

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
        this.showAlert(errorMessage);
      },
    });

    form.reset();
  }

  onCloseAlert() {
    this.error = null;
  }

  private showAlert(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
    this.destroyRef.onDestroy(() => {
      if (this.closeSub) {
        this.closeSub.unsubscribe();
      }
    });
  }
}
