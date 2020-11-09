import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { components, providers, modules } from './index';
import { MenuComponent } from './menu/menu.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

@NgModule({
  declarations: [AppComponent, ...components, MenuComponent, EditRecipeComponent, RecipeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ...modules
  ],
  providers: [...providers],
  bootstrap: [AppComponent]
})
export class AppModule {}
