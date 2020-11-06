import { SigninComponent, SignupComponent } from './auth';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  MatTooltipModule
];
