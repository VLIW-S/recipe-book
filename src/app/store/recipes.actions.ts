import { createAction, props } from '@ngrx/store';
import { Recipe } from '../shared/recipe.model';

export const addRecipe = createAction(
  '[Recipe] Add a new recipe',
  props<{ recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  '[Recipe] Delete a recipe',
  props<{ index: number }>()
);
