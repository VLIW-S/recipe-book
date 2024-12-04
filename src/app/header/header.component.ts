import { Component, signal } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [DropdownDirective, RouterLink, RouterLinkActive]
})
export class HeaderComponent {
  isCollapse = signal(true);

  collapse() {
    this.isCollapse.update((value) => !value);
  }
}
