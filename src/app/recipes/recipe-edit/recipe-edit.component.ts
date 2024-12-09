import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { addRecipe } from '../../store/recipes.actions';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  imports: [ReactiveFormsModule],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  private route = inject(ActivatedRoute);
  private destrojRef = inject(DestroyRef);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private store = inject(Store);
  recipeForm: FormGroup;

  get recipeControls() {
    const formArray = this.recipeForm.get('ingredients') as FormArray;
    return formArray.controls;
  }

  constructor() {}

  ngOnInit() {
    const subscribtion = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    this.destrojRef.onDestroy(() => subscribtion.unsubscribe);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      // NgRx
      this.store.dispatch(addRecipe({
        recipe: new Recipe(
          this.recipeForm.controls.name.value,
          this.recipeForm.controls.description.value,
          this.recipeForm.controls.imagePath.value,
          this.recipeForm.controls.ingredients.value,
        )
      }));
    }
    this.onCancel();
  }

  onAddIngredient() {
    let fromArray = this.recipeForm.get('ingredients') as FormArray;
    fromArray.push(
      new FormGroup({
        name: new FormControl<string>(null, Validators.required),
        amount: new FormControl<number>(null, {
          validators: [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ],
        }),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl<string>(
                ingredient.name,
                Validators.required
              ),
              amount: new FormControl<number>(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl<string>(recipeName, {
        validators: [Validators.required],
      }),
      imagePath: new FormControl(recipeImagePath, {
        validators: [Validators.required],
      }),
      description: new FormControl<string>(recipeDescription, {
        validators: [Validators.required],
      }),
      ingredients: recipeIngredients,
    });
  }
}
