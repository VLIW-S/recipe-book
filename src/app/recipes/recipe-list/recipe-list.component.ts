import { Component, inject, OnInit } from '@angular/core';

import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
    imports: [RecipeItemComponent]
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);
  recipes = this.recipeService.allRecipes();

  constructor() {}

  ngOnInit() {}
}
