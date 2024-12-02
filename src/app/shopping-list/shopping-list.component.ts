import { Component, inject, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  standalone: true,
  imports: [ShoppingEditComponent],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private slService = inject(ShoppingListService);

  constructor() {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe({
      next: (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      },
    });
  }
}
