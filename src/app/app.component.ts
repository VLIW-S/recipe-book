import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HeaderComponent, RecipesComponent, ShoppingListComponent],
})
export class AppComponent {
  loadedFeature = signal('recipe');

  onNavigate(feature: string) {
    this.loadedFeature.set(feature);
  }
}
