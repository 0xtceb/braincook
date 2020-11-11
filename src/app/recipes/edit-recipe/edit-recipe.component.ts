import { Component, OnInit } from '@angular/core';
import { Ingredient, Recipe } from '../../models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipeNameControl: FormControl = new FormControl('', { validators: [Validators.required] });
  recipe: Recipe = new Recipe();
  ingredients: Ingredient[] = [new Ingredient()];

  constructor() {}

  ngOnInit(): void {}

  addIngredient(): void {
    this.ingredients.push(new Ingredient());
  }
}
