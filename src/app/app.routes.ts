import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: '**', component: NopagefoundComponent }

];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
