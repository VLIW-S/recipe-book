import { Ingredient } from '../shared/ingredient.model';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients = signal<Ingredient[]>([
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]);

  allIngredients = this.ingredients.asReadonly;

  addIngredient(ingredient: Ingredient) {
    this.ingredients.update((value) => {
      const copyCurrentList = [...value];

      const indexItem = value.findIndex(
        (index) => index.name === ingredient.name
      );

      if (indexItem !== -1) {
        const updatedAmountItem =
          copyCurrentList[indexItem].amount + ingredient.amount;

        if (updatedAmountItem <= 0) {
          copyCurrentList.splice(indexItem, 1);
        } else {
          copyCurrentList[indexItem] = new Ingredient(
            copyCurrentList[indexItem].name,
            updatedAmountItem
          );
        }
      } else {
        if (ingredient.amount > 0) {
          copyCurrentList.push(ingredient);
        }
      }

      return copyCurrentList;
    });
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.update((value) => {
      const copyCurrentList = [...value];

      ingredients.forEach((ingredient) => {
        debugger;
        const indexItem = copyCurrentList.findIndex(
          (item) => item.name === ingredient.name
        );

        if (indexItem !== -1) {
          const updatedAmountItem =
            copyCurrentList[indexItem].amount + ingredient.amount;

          copyCurrentList[indexItem] = new Ingredient(
            copyCurrentList[indexItem].name,
            updatedAmountItem
          );
        } else {
          copyCurrentList.push(ingredient);
        }
      });

      return copyCurrentList;
    });
  }
}
