import { Recipe } from '../shared/recipe.model';

export const selectRecipes = (state: { recipes: Recipe[] }) => state.recipes;