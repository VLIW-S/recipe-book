import { inject, Injectable, signal } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from '../shared/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private shoppingListlService = inject(ShoppingListService);

  /* 
   private recipes = signal<Recipe[]>([
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ])
  */

  private recipes = signal<Recipe[]>([]);

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
