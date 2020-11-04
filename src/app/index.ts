import { SigninComponent, SignupComponent } from './auth';
import { AuthService } from './services';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
export * from './auth/index';
export * from './services/index';

export const components = [SigninComponent, SignupComponent];
export const providers = [AuthService];
export const modules = [MatDialogModule, MatButtonModule];
