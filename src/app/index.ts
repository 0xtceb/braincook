import { SigninComponent, SignupComponent } from './auth';
import { AuthService } from './services';
import { AuthGuard } from './shared/guard/auth.guard';

export * from './auth/index';
export * from './services/index';

export const components = [SigninComponent, SignupComponent];
export const providers = [AuthService, AuthGuard];
