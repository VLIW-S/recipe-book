import { Component, inject, OnInit } from '@angular/core';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list.service';


@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    imports: [ShoppingEditComponent]
})
export class ShoppingListComponent implements OnInit {
  private shoppingListlService = inject(ShoppingListService);
  ingredients = this.shoppingListlService.allIngredients();

  constructor() {}

  ngOnInit() {}
}
