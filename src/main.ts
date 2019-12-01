import { DashboardCoomponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ProfileComponent } from './profile.component';
import { MenuComponent } from './user-menu.component';
import { BadApp } from './bad-app';

const routes = [
  {
    route: '',
    component: DashboardCoomponent
  },
  {
    route: '/profile',
    component: ProfileComponent
  }
];

const directives = [
  MenuComponent,
  LoginComponent,
  RegisterComponent
];

const app = new BadApp(routes, directives);
