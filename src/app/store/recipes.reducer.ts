import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../shared/recipe.model';
import { addRecipe, deleteRecipe, getRecipes, getRecipesFailure, getRecipesSuccess, saveRecipes, saveRecipesFailure, saveRecipesSuccess } from './recipes.actions';
import { Ingredient } from '../shared/ingredient.model';

export interface AppState {
  recipes: Recipe[];
  shoppingList: Ingredient[]; 
  isLoadingRecipes: boolean
  errorRecipes: string
}

const initialState: AppState = {
  recipes: [],
  shoppingList: [],
  isLoadingRecipes: false,
  errorRecipes: null
};

export const stateReducer = createReducer(
  initialState,
  on(addRecipe, (state, action) => ({
    ...state,
    recipes: [...state.recipes, action.recipe],
  })),
  on(deleteRecipe, (state, action) => ({
    ...state,
    recipes: [
      ...state.recipes.slice(0, action.index),
      ...state.recipes.slice(action.index + 1),
    ],
  })),
  on(getRecipes, (state) => ({
    ...state,
    isLoadingRecipes: true,
    errorRecipes: null,
    recipes: [...state.recipes]
  })),
  on(getRecipesSuccess, (state, action) => ({
    ...state,
    isLoadingRecipes: false,
    errorRecipes: null,
    recipes: [...action.recipes],
  })),
  on(getRecipesFailure, (state, action) => ({
    ...state,
    isLoadingRecipes: false,
    errorRecipes: action.error,
  })),
  on(saveRecipes, (state) => ({
    ...state,
    isLoadingRecipes: true,
    errorRecipes: null,
  })),
  on(saveRecipesSuccess, (state, action) => ({
    ...state,
    isLoadingRecipes: false,
    errorRecipes: null,
  })),
  on(saveRecipesFailure, (state, action) => ({
    ...state,
    isLoadingRecipes: false,
    errorRecipes: action.error,
  }))
);