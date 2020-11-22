import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../../models';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  currentUserId: string;
  recipiesRef: AngularFireList<Recipe>;
  recipies: Recipe[];
  recipiesSnapshot: any;
  asyncRecipies: BehaviorSubject<Recipe[]> = new BehaviorSubject([]);
  constructor(private database: AngularFireDatabase) {
    this.currentUserId = JSON.parse(localStorage.getItem('user'))['uid'];
    this.recipiesRef = this.database.list(`${this.currentUserId}/recipies`);

    this.recipiesRef
      .snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<Recipe>[]) => {
          return snapshots.map((snapshot) => {
            const recipe = new Recipe(snapshot.payload.val());
            recipe.key = snapshot.key;
            return recipe;
          });
        })
      )
      .subscribe((recipies: Recipe[]) => {
        this.recipies = recipies;
        this.asyncRecipies.next(this.recipies);
      });
  }

  saveRecipe(recipe: Recipe): Observable<firebase.database.Reference> {
    return from(this.recipiesRef.push(recipe));
  }

  deleteRecipe(recipe: Recipe): void {
    this.recipiesRef.remove(recipe.key);
  }

  deleteAllRecipies(): void {
    this.recipiesRef.remove();
  }
}
