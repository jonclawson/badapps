import { userService } from './core.services';
import { User, UserService } from './user.service';
export class ProfileComponent {
  template = `
      <div> {{data.firstName}} </div>
      <div> {{data.lastName}} </div>
      <div> {{data.username}} </div>
      <div> {{data.company}} </div>
  `;
  user: User;
  firstName: string;
  lastName: string;
  username: string;
  userService: UserService;
  constructor () {
    this.userService = userService;
    this.userService.profile().subscribe((user: User) => {
      console.log(user);
      this.user = user;
      Object.assign(this, user);
    });
  }

}
