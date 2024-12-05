import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
})
export class RecipeStartComponent implements OnInit {
  recipeService = inject(RecipeService);
  recipes = this.recipeService.allRecipes();

  constructor() {}

  ngOnInit() {}
}
