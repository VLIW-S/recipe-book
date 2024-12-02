import { Component, inject, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  standalone: true,
  imports: [RecipeItemComponent],
})
export class RecipeListComponent implements OnInit {
  private rService = inject(RecipeService);
  recipes: Recipe[];

  constructor() {}

  ngOnInit() {
    this.recipes = this.rService.getRecipes();
  }
}
