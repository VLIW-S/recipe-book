import { Routes } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./recipes/recipes-routing').then(mod => mod.routes),
  },
  {
    path: 'shopping-list',
    loadComponent: () => 
      import('./shopping-list/shopping-list.component').then((mod) => mod.ShoppingListComponent),
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '' },
];