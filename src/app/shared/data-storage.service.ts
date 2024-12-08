import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

import { catchError, map, tap } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStoreServices {
  private httpClient = inject(HttpClient);
  private recipeService = inject(RecipeService);
  private shoppingListService = inject(ShoppingListService);

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    return this.httpClient
      .put(
        'https://easy-recipe-book-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        'https://easy-recipe-book-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipe) => {
          return recipe.map((res) => {
            return {
              ...res,
              ingredients: res.ingredients ? res.ingredients : [],
            };
          });
        }),
        tap((recipe) => {
          this.recipeService.setRecipes(recipe);
        }, catchError(this.handleError))
      );
  }

  storeShoppingList() {
    const shoppingList = this.shoppingListService.getIngredients();

    return this.httpClient
      .put(
        'https://easy-recipe-book-default-rtdb.firebaseio.com/shopping-list.json',
        shoppingList
      )
      .pipe(catchError(this.handleError))
      .subscribe((ingredients) => {
        console.log(ingredients);
      });
  }

  fetchShoppingList() {
    return this.httpClient
      .get<Ingredient[]>(
        'https://easy-recipe-book-default-rtdb.firebaseio.com/shopping-list.json'
      )
      .pipe(catchError(this.handleError))
      .subscribe((ingredients) => {
        this.shoppingListService.setIngredients(ingredients);
      });
  }

  private handleError(resError: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    return throwError(errorMessage);
  }
}
