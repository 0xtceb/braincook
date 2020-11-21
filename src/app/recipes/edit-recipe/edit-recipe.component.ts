import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { RecipeService } from '../../services';
import { Ingredient, Recipe } from '../../models';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;
  recipeNameControl: FormControl = new FormControl('', { validators: [Validators.required] });
  recipe: Recipe = new Recipe();

  ingredients: Ingredient[] = [new Ingredient()];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  addIngredient(): void {
    this.ingredients.push(new Ingredient());
  }

  save(): void {
    if (this.recipeNameControl.valid) {
      this.recipe.name = this.recipeNameControl.value;
    }
    this.recipe.ingredients = this.ingredients;
    this.recipe.description = this.editor.quillEditor.root.innerHTML;
    this.recipeService.saveRecipe(this.recipe).subscribe();
  }
}
