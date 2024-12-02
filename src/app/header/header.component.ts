import { Component, Signal, signal } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [DropdownDirective],
})
export class HeaderComponent {
  isCollapse = signal(true);

  collapse() {
    this.isCollapse.update((value) => !value);
  }
}
