import { userService } from './core.services';
import { User, UserService } from './user.service';
export class ProfileComponent {
  template = `
      <h1>My Profile</h1>
      <div>First Name:  {{data.firstName}} </div>
      <div>Last Name:  {{data.lastName}} </div>
      <div>Username:  {{data.username}} </div>
  `;
  user: User;
  firstName: string;
  lastName: string;
  username: string;
  userService: UserService;
  constructor () {
    this.userService = userService;
    this.userService.profile().subscribe((user: User) => {
      this.user = user;
      Object.assign(this, user);
    });
  }

}
