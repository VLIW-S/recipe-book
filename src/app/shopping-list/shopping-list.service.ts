import { Ingredient } from '../shared/ingredient.model';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients = signal<Ingredient[]>([
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ])

  allIngredients = this.ingredients.asReadonly;

  addIngredient(ingredient: Ingredient) {
    this.ingredients.update(value => [...value, ingredient]);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.update(value => [...value, ...ingredients]);
  }
}
