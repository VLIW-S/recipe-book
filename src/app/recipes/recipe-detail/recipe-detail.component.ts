import { Component, inject, input, OnInit } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { RecipeService } from '../recipe.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../../shared/recipe.model';
import { Store } from '@ngrx/store';
import { deleteRecipe } from '../../store/recipes.actions';
import { DataStoreServices } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  imports: [DropdownDirective],
})
export class RecipeDetailComponent implements OnInit {
  recipeData = input.required<{recipe: Recipe, index: number}>();
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store<Recipe[]>);

  constructor() {}

  ngOnInit() {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeData().recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    //this.recipeService.deleteRecipe(this.index);
    this.store.dispatch(deleteRecipe({ index: this.recipeData().index }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}


export const recipeResolver: ResolveFn<Object> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const recipeService = inject(RecipeService);
  let index: number;
  let recipe: Recipe;


  index = route.params.id;
  recipe = recipeService.getRecipe(index);

  return {recipe, index};
};

export const recipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const recipesService = inject(RecipeService);
  const dataStorageService = inject(DataStoreServices);
  const recipes = recipesService.getRecipes();

  if (recipes.length === 0) {
    return dataStorageService.fetchRecipes();
  } else {
    return recipes;
  }
};
