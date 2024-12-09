import { createAction, props } from '@ngrx/store';
import { Recipe } from '../shared/recipe.model';

export const addRecipe = createAction(
  '[Recipes] Add a new recipe',
  props<{ recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  '[Recipes] Delete a recipe',
  props<{ index: number }>()
);
export const getRecipes = createAction('[Recipes] Get recipes');

export const getRecipesSuccess = createAction(
  '[Recipes] Get Recipes success',
  props<{ recipes: Recipe[] }>()
);

export const getRecipesFailure = createAction(
  '[Recipes] Get Recipes failure',
  props<{ error: string }>()
);

export const saveRecipes = createAction(
  '[Recipes] Save recipes',
  props<{ recipe: Recipe[] }>()
);

export const saveRecipesSuccess = createAction(
  '[Recipes] Save recipes success'
);

export const saveRecipesFailure = createAction(
  '[Recipes] Save recipes failure',
  props<{ error: string }>()
);
