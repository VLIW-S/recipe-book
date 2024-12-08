import { Component, inject, OnInit } from '@angular/core';

import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
    imports: [RecipeItemComponent, SpinnerComponent]
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  recipes = this.recipeService.allRecipes();
  isLoading = this.recipeService.isLoadingData;
  error = this.recipeService.errorData;

  constructor() {}

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnInit() {}
}
