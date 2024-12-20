import { Routes } from '@angular/router';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import {
  RecipeDetailComponent,
  recipeResolver,
  recipesResolver,
} from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from './recipes-resolver.service';

export const routes: Routes = [
  { path: '', component: RecipeStartComponent },
  { path: 'new', component: RecipeEditComponent },
  {
    path: ':id',
    component: RecipeDetailComponent,
    resolve: {recipesResolver, recipeData: recipeResolver},
  },
  {
    path: ':id/edit',
    component: RecipeEditComponent,
    resolve: [RecipesResolverService],
  },
];
