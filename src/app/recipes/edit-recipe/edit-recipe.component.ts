import { Component, OnInit, ViewChild, Input, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { RecipeService } from '../../services';
import { Ingredient, Recipe } from '../../models';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;
  @ViewChild(MatStepper) stepper: MatStepper;
  @Optional() @Input() recipeToEdit: Recipe;

  recipeNameControl: FormControl = new FormControl('', { validators: [Validators.required] });
  recipe: Recipe = new Recipe();

  ingredients: Ingredient[] = [new Ingredient()];

  constructor(private recipeService: RecipeService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.recipeToEdit) {
      this.recipe = this.recipeToEdit;
      this.ingredients = this.recipe.ingredients;
      this.recipeNameControl.setValue(this.recipe.name);
    }
  }

  updateEditor(): void {
    if (this.recipeToEdit) {
      this.editor.writeValue(this.recipeToEdit.description);
    }
  }

  addIngredient(): void {
    this.ingredients.push(new Ingredient());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }

  update(): void {
    if (this.recipeNameControl.valid) {
      this.recipe.name = this.recipeNameControl.value;
    }
    this.recipe.ingredients = this.ingredients;
    this.recipe.description = this.editor.quillEditor.root.innerHTML;

    this.recipeService.updateRecipe(this.recipe).subscribe(() => {
      this.stepper.reset();
      this.snackBar.open('Your recipe was successfully updated !', null, { duration: 2000 });
    });
  }

  save(): void {
    if (this.recipeNameControl.valid) {
      this.recipe.name = this.recipeNameControl.value;
    }
    this.recipe.ingredients = this.ingredients;
    this.recipe.description = this.editor.quillEditor.root.innerHTML;
    this.recipeService.saveRecipe(this.recipe).subscribe(() => {
      this.recipeNameControl.reset();
      this.editor.writeValue('');
      this.ingredients = [new Ingredient()];
      this.recipe = new Recipe();
      this.stepper.reset();
      this.snackBar.open('Your recipe was added to your list !', null, { duration: 2000 });
    });
  }
}
