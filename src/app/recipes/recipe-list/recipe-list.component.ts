import { Component, inject, OnInit } from '@angular/core';

import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../../shared/recipe.model';
import { AsyncPipe } from '@angular/common';
import {
  selectErrorRecipes,
  selectIsLoadingRecipes,
  selectRecipes,
} from '../../store/recipes.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  imports: [RecipeItemComponent, SpinnerComponent, AsyncPipe],
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store<Recipe[]>);
  recipes = this.recipeService.allRecipes();
  isLoading = this.recipeService.isLoadingData;
  error = this.recipeService.errorData;
  recipes$: Observable<Recipe[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor() {
    this.recipes$ = this.store.select(selectRecipes);
    this.isLoading$ = this.store.select(selectIsLoadingRecipes);
    this.error$ = this.store.select(selectErrorRecipes);
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnInit() {}
}
