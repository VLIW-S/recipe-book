import { Component, inject, input, OnInit } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
    imports: [DropdownDirective]
})
export class RecipeDetailComponent implements OnInit {
  recipe = input.required<Recipe>();
  private recipeService = inject(RecipeService);

  constructor() {}

  ngOnInit() {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe().ingredients);
  }
}
