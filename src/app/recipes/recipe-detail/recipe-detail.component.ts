import { Component, inject, Input, OnInit } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  standalone: true,
  imports: [DropdownDirective],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  private rService = inject(RecipeService);

  constructor() {}

  ngOnInit() {}

  onAddToShoppingList() {
    this.rService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
