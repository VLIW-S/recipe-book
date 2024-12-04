import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
    imports: [ReactiveFormsModule]
})
export class ShoppingEditComponent implements OnInit {
  private shoppingListlService = inject(ShoppingListService);
  form = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    amount: new FormControl('', {validators: [Validators.required]})
  });
  
  constructor() {}

  ngOnInit() {}

  capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const ingName = this.form.value.name;
    const ingAmount = +this.form.value.amount;
    const newIngredient = new Ingredient(this.capitalizeFirstLetter(ingName), ingAmount);
    this.shoppingListlService.addIngredient(newIngredient);

    this.form.reset();
  }
}
