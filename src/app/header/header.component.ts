import { Component, output, signal } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [DropdownDirective]
})
export class HeaderComponent {
  isCollapse = signal(true);
  featureSelected = output<string>();

  collapse() {
    this.isCollapse.update((value) => !value);
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
