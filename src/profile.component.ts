import { userService } from './core.services';
import { User, UserService } from './user.service';
export class ProfileComponent {
  template = `
      <div> {{data.username}} </div>
  `;
  user: User;
  username: string;
  userService: UserService;
  constructor () {
    this.userService = userService;
    this.userService.profile().subscribe((user: User) => {
      console.log(user);
      this.user = user;
      this.username = user.username;
    });
  }

}
