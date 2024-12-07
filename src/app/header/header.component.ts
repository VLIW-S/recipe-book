import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { DataStoreServices } from '../shared/data-storage.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private dataStoreServices = inject(DataStoreServices);
  private authService = inject(AuthService);
  isCollapse = true;
  isAuthenticated = false;
  currentUrl: string;
  routerEventsSub: Subscription;
  userSub: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.routerEventsSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl = event.url;
      });
    this.destroyRef.onDestroy(() => this.routerEventsSub.unsubscribe);

    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !user ? false : true;
      },
    });
    this.destroyRef.onDestroy(() => this.userSub.unsubscribe);
  }

  collapse() {
    this.isCollapse = !this.isCollapse;
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveData() {
    if (this.currentUrl === '/shopping-list') {
      this.dataStoreServices.storeShoppingList();
    } else if (this.currentUrl === '/recipes') {
      this.dataStoreServices.storeRecipes();
    } else return;
  }

  onFetchData() {
    if (this.currentUrl === '/shopping-list') {
      this.dataStoreServices.fetchShoppingList();
    } else if (this.currentUrl === '/recipes') {
      this.dataStoreServices.fetchRecipes().subscribe();
    } else return;
  }
}
