import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { Recipe } from '../../models';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  currentUserId: string;
  recipiesRef: AngularFireList<Recipe>;
  recipies: Recipe[];
  constructor(private database: AngularFireDatabase) {
    this.currentUserId = JSON.parse(localStorage.getItem('user'))['uid'];
    this.recipiesRef = this.database.list(`${this.currentUserId}/recipies`);
    this.recipiesRef.valueChanges().subscribe((recipies: Recipe[]) => {
      this.recipies = recipies.map((recipe) => new Recipe(recipe));
      console.log(this.recipies);
    });
  }

  saveRecipe(recipe: Recipe): Observable<firebase.database.Reference> {
    return from(this.recipiesRef.push(recipe));
  }
}
