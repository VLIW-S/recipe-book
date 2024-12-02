import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent],
})
export class RecipesComponent implements OnInit {
  selectedRecipe = signal<Recipe>(undefined);
  private rService = inject(RecipeService);

  constructor() {}

  ngOnInit() {
    this.rService.recipeSelected.subscribe({
      next: (recipe: Recipe) => {
        this.selectedRecipe.set(recipe);
      }
    });
  }
}
