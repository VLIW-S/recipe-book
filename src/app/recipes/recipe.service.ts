import { inject, Injectable, signal } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from '../shared/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private shoppingListlService = inject(ShoppingListService);
  private recipes = signal<Recipe[]>([]);
  isLoadingData = signal<boolean>(false);
  errorData = signal<string>('');
  allRecipes = this.recipes.asReadonly;

  setRecipes(recipes: Recipe[]) {
    this.recipes.set(recipes);
  }

  getRecipe(id: number) {
    return this.recipes()[id];
  }

  getRecipes() {
    return this.recipes();
  }

  constructor() {}

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListlService.addIngredients(ingredients);
  }

  updateRecipe(index: number, updateItem: Recipe) {
    this.recipes.update((value) => {
      const copyCurrentList = [...value];
      copyCurrentList[index] = updateItem;
      return copyCurrentList;
    })
  }

  deleteRecipe(index: number) {
    this.recipes.update((value) => {
      const copyCurrentList = [...value];
      copyCurrentList.splice(index, 1);
      return copyCurrentList;
    })
  }

  addRecipe(recipe: Recipe) {
    this.recipes.update(value => {
      const copyCurrentList = [...value];
      copyCurrentList.push(recipe);

      return copyCurrentList;
    })
  }
}
