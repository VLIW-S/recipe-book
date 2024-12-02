import { Component, OnInit } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  standalone: true,
  imports: [DropdownDirective],
})
export class RecipeDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
