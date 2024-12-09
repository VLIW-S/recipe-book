import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  imports: [ReactiveFormsModule],
})
export class ShoppingEditComponent implements OnInit {
  private shoppingListlService = inject(ShoppingListService);
  private destroyRef = inject(DestroyRef);
  isEditMode = false;
  editItemIndex: number;
  editItem: Ingredient;
  subscription: Subscription;
  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    amount: new FormControl<number>(null, {
      validators: [Validators.required],
    }),
  });

  constructor() {}

  ngOnInit() {
    this.subscription = this.shoppingListlService.startedEditing.subscribe({
      next: (value) => {
        this.isEditMode = true;
        this.editItemIndex = value;
        this.editItem = this.shoppingListlService.getIngredient(value);
        this.form.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      },
    });

    this.destroyRef.onDestroy(() => this.subscription.unsubscribe());
  }

  capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const ingName = this.form.value.name;
    const ingAmount = +this.form.value.amount;
    const newIngredient = new Ingredient(
      this.capitalizeFirstLetter(ingName),
      ingAmount
    );

    if (this.isEditMode) {
      this.shoppingListlService.updateIngredients(
        this.editItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListlService.addIngredient(newIngredient);
    }
    this.isEditMode = false;
    this.form.reset();
  }

  onClear() {
    this.isEditMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListlService.deleteIngredients(this.editItemIndex);
    this.isEditMode = false;
    this.form.reset();
  }
}
