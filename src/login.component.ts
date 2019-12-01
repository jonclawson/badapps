import { userService } from './core.services';

export class LoginComponent {
  selector = 'login';
  template = `
    <form name="login" onsubmit="return">
      <div class="form-group">
        <label>
          username or email
        </label>
        <input type="text" name="usernameoremail" required />
      </div>

      <div class="form-group">
        <label>
          Password
        </label>
        <input type="password" name="password" />
      </div>

      <button type="button" click="component.save()" >Save</button>
      <button type="button" click="component.canel()" >Cancel</button>

    </form>
  `;
  userService: any;
  constructor (
    // userService: UserService // TODO support injections
  ) {
    this.userService = userService;
  }

  save () {
    const username = (<HTMLInputElement>document.querySelector('[name=usernameoremail]')).value;
    const password = (<HTMLInputElement>document.querySelector('[name=password]')).value;
    this.userService.login(username, password).subscribe((r: any) => {
      location.reload();
    });
  }
}
