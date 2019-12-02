
import { userService } from './core.services';
import { UserService } from './user.service';

export class DashboardCoomponent {
    template = `
    <h1>Dashboard</h1>
    <posts></posts>
    <div if="!data.name">
      <login></login>
      <register></register>
    </div>
    `;
    name: any = 'guest';
    userService: UserService;
    constructor() {
      this.userService = userService;
      if (this.userService.token) {
        this.userService.profile().subscribe(user => this.name = user.firstName);
      }
      else {
        this.name = false;
      }
    }
}
