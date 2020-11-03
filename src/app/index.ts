import { SigninComponent, SignupComponent } from './auth';
import { AuthService } from './services';

export * from './auth/index';
export * from './services/index';

export const components = [SigninComponent, SignupComponent];
export const providers = [AuthService];
