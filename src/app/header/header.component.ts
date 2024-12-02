import { Component, EventEmitter, Output, signal } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [DropdownDirective],
})
export class HeaderComponent {
  isCollapse = signal(true);
  @Output() featureSelected = new EventEmitter<string>();

  collapse() {
    this.isCollapse.update((value) => !value);
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
