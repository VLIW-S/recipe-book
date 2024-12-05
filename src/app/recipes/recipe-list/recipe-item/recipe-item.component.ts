import { Component, OnInit, input } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { Recipe } from '../../../shared/recipe.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
    imports: [RouterLink, RouterLinkActive]
})
export class RecipeItemComponent implements OnInit {
  recipe = input.required<Recipe>();
  id = input.required<number>();
  constructor() {}

  ngOnInit() {}
}
