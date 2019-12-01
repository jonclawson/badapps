
import { userService } from './core.services';
import { UserService } from './user.service';

export class DashboardCoomponent {
    template = `
    <div if="!data.name">
      <login></login>
      <register></register>
    </div>
    `;
    name = 'guest';
    userService: UserService;
    constructor() {
      this.userService = userService;
      this.userService.profile().subscribe(user => this.name = user.firstName);
    }
}
