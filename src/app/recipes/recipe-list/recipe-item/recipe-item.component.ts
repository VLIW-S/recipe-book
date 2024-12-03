import { Component, OnInit, inject, input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
    imports: []
})
export class RecipeItemComponent implements OnInit {
  recipe = input.required<Recipe>();
  private recipeService = inject(RecipeService);
  constructor() {}

  ngOnInit() {}

  onSelected() {
    this.recipeService.recipeSelected.set(this.recipe());
  }
}
