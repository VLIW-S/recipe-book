import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
    imports: [DropdownDirective]
})
export class RecipeDetailComponent implements OnInit {
  recipe = signal<Recipe>(undefined);
  id: number;
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destrojRef = inject(DestroyRef);

  constructor() {}

  ngOnInit() {
    const subscribtion = this.route.params.subscribe({
      next: param => {
        this.id = +param['id'];
        this.recipe.set(this.recipeService.getRecipe(this.id));
      } 
    });

    this.destrojRef.onDestroy(() => subscribtion.unsubscribe);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe().ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
