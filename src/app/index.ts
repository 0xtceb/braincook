import { SigninComponent, SignupComponent } from './auth';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { QuillModule } from 'ngx-quill';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { MenuComponent } from './menu/menu.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export * from './auth/index';
export * from './services/index';

export const components = [
  SigninComponent,
  SignupComponent,
  HeaderComponent,
  MenuComponent,
  EditRecipeComponent,
  RecipeComponent
];
export const providers = [AuthService];
export const modules = [
  MatDialogModule,
  MatButtonModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDividerModule,
  MatSidenavModule,
  MatListModule,
  HttpClientModule,
  MatSelectModule,
  MatCardModule,
  AngularFireDatabaseModule,
  FormsModule,
  MatStepperModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  QuillModule.forRoot({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button

        ['link', 'image', 'video'] // link and image, video
      ]
    }
  }),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })
];

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
