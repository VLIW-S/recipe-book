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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private dataStoreServices = inject(DataStoreServices);
  isCollapse = true;
  currentUrl: string;
  subscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl = event.url;
      });

    this.destroyRef.onDestroy(() => this.subscription.unsubscribe);
  }

  collapse() {
    this.isCollapse = !this.isCollapse;
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
