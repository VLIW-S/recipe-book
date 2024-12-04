import { Component, OnInit, input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
