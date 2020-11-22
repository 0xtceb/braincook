import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatListItem } from '@angular/material/list';
import { Recipe } from '../models';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(MatSidenav) menu: MatSidenav;
  @ViewChild('editRecipe') editRecipeItem: MatListItem;
  openedMenu = '';
  recipeToEdit: Recipe = null;
  @Input() set openNav(open: boolean) {
    if (this.menu) {
      this.menu.toggle(open);
    }
  }
  @Output() closedEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  open(menuName: string): void {
    this.recipeToEdit = null;
    this.openedMenu = menuName;
    this.menu.toggle(false);
    this.closedEvent.emit();
  }

  edit(recipe: Recipe): void {
    this.open('recipe');
    this.editRecipeItem._getHostElement().click();
    this.recipeToEdit = recipe;
    this.openedMenu = 'recipe';
    this.menu.toggle(true);
  }
}
