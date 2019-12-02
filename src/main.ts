import * as coreServices from './core.services';
import { DashboardCoomponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ProfileComponent } from './profile.component';
import { MenuComponent } from './user-menu.component';
import { UsersComponent } from './users.component';
import { PostComponent } from './post.component';
import { PostsComponent } from './posts.component';
import { CreatePostComponent } from './create-post.component';
import { SideNavComponent } from './side-nav.component';
import { BadApp } from './bad-app';

const routes = [
  {
    route: '',
    component: DashboardCoomponent
  },
  {
    route: '/profile',
    component: ProfileComponent
  },
  {
    route: '/post/:id',
    component: PostComponent
  },
  {
    route: '/post/create',
    component: CreatePostComponent
  }
];

const directives = [
  MenuComponent,
  LoginComponent,
  RegisterComponent,
  UsersComponent,
  CreatePostComponent,
  PostsComponent,
  SideNavComponent
];

const app = new BadApp(routes, directives);
