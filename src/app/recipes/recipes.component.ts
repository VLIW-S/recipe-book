import { Component, inject, OnInit } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

import { RecipeService } from './recipe.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
    imports: [RecipeListComponent, RecipeDetailComponent]
})
export class RecipesComponent implements OnInit {
  private recipeService = inject(RecipeService);
  selectedRecipe = this.recipeService.recipeSelected;

  constructor() {}

  ngOnInit() {}
}
