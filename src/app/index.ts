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
export * from './auth/index';
export * from './services/index';

export const components = [SigninComponent, SignupComponent, HeaderComponent];
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
  MatProgressSpinnerModule
];
