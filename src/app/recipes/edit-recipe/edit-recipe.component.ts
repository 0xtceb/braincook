import { Component, OnInit, ViewChild, Input, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { RecipeService } from '../../services';
import { Ingredient, Recipe } from '../../models';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

class RecipeQualifier {
  greasy: boolean;
  normal: boolean;
  light: boolean;

  constructor() {
    this.normal = true;
  }

  qualify(type: 'greasy' | 'normal' | 'light'): void {
    switch (type) {
      case 'greasy':
        this.greasy = true;
        this.normal = false;
        this.light = false;
        break;
      case 'normal':
        this.greasy = false;
        this.normal = true;
        this.light = false;
        break;
      case 'light':
        this.greasy = false;
        this.normal = false;
        this.light = true;
        break;
    }
  }

  value(): 'light' | 'normal' | 'greasy' {
    if (this.light) return 'light';
    if (this.normal) return 'normal';
    if (this.greasy) return 'greasy';
  }
}

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
  qualifier: RecipeQualifier = new RecipeQualifier();
  ingredients: Ingredient[] = [new Ingredient()];

  constructor(private recipeService: RecipeService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.recipeToEdit) {
      this.recipe = this.recipeToEdit;
      this.ingredients = this.recipe.ingredients;
      this.qualifier.qualify(this.recipeToEdit.qualifier);
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
    this.recipe.qualifier = this.qualifier.value();

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
    this.recipe.qualifier = this.qualifier.value();
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
