import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../shared/recipe.model';
import { Store } from '@ngrx/store';
import { deleteRecipe } from '../../store/recipes.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
    imports: [DropdownDirective]
})
export class RecipeDetailComponent implements OnInit {
  recipe = signal<Recipe>(undefined);
  index: number;
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destrojRef = inject(DestroyRef);
  private store = inject(Store<Recipe[]>);

  constructor() {}

  ngOnInit() {
    const subscribtion = this.route.params.subscribe({
      next: param => {
        this.index = +param['id'];
        this.recipe.set(this.recipeService.getRecipe(this.index));
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

  onDelete() {
    this.recipeService.deleteRecipe(this.index);
    // NgRx
    this.store.dispatch(deleteRecipe({index: this.index}));
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
