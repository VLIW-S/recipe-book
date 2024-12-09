import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  getRecipes,
  getRecipesFailure,
  getRecipesSuccess,
  saveRecipes,
  saveRecipesFailure,
  saveRecipesSuccess,
} from './recipes.actions';
import { DataStoreServices } from '../shared/data-storage.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RecipesEffects {
  private action$ = inject(Actions);
  private dataStoreServices = inject(DataStoreServices);

  getRecipes = createEffect(() =>
    this.action$.pipe(
      ofType(getRecipes),
      exhaustMap(() =>
        this.dataStoreServices.fetchRecipes().pipe(
          map((recipes) => {
            return getRecipesSuccess({ recipes });
          }),
          catchError((error) => of(getRecipesFailure({ error })))
        )
      )
    )
  );

  saveRecipes = createEffect(() =>
    this.action$.pipe(
      ofType(saveRecipes),
      exhaustMap((action) =>
        this.dataStoreServices.storeRecipes(action.recipe).pipe(
          map(() => saveRecipesSuccess()),
          catchError((error) => of(saveRecipesFailure({ error })))
        )
      )
    )
  );
}
