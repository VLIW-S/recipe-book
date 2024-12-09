import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './recipes.reducer';

export const selectAppState = createFeatureSelector<AppState>('state');

export const selectRecipes = createSelector(
  selectAppState,
  (state) => state.recipes
);

export const selectIsLoadingRecipes = createSelector(
  selectAppState,
  (state) => state.isLoadingRecipes
);

export const selectErrorRecipes = createSelector(
  selectAppState,
  (state) => state.errorRecipes
);

export const selectShoppingList = createSelector(
  selectAppState,
  (state) => state.shoppingList
);
