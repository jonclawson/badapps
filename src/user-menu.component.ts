
import { stateService } from './core.services';
import { userService } from './core.services';
import { UserService } from './user.service';

export class MenuComponent {
    selector = 'user-menu';
    template = `
    <a click="data.home()" style="cursor: pointer;">hello {{data.name}}</a>
    <a click="data.profile()" style="cursor: pointer;">My Profile</a>
    <a click="data.logout()" style="cursor: pointer;">Logout</a>
    `;
    name = '';
    state: any;
    userService: UserService;
    constructor() {
      this.state = stateService;
      this.userService = userService;
      this.userService.profile().subscribe(user => this.name = user.firstName);
    }

    data () {
      const d = this;
      return {
        name: d.name,
        home () {
          d.state.go('');
        },
        profile () {
          d.state.go('/profile');
        },
        logout: userService.logout
      };
    }


}
