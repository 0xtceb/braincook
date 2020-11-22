import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services';
import { Recipe } from '../../models';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipies: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipies = this.recipeService.asyncRecipies;
  }

  deleteRecipe(recipe: Recipe): void {
    this.recipeService.deleteRecipe(recipe);
  }
}
