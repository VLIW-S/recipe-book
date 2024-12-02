import { Component, OnInit, Input, inject } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  standalone: true,
  imports: [],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  private rService = inject(RecipeService);
  constructor() {}

  ngOnInit() {}

  onSelected() {
    this.rService.recipeSelected.emit(this.recipe);
  }
}
