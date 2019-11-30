import { UserService } from './user.service'

export class RegisterComponent {
  selector = 'register';
  template = `
    <form name="register" onsubmit="return">
      <div class="form-group">
        <label>First Name</label>
        <input type="text" name="firstname" value="john" />
      </div>

      <div class="form-group">
        <label>Last Name</label>
        <input type="text" name="lastname" value="mann" />
      </div>

      <div class="form-group">
        <label>Compant</label>
        <input type="text" name="company" value="jonman" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="text" name="email" value="jon@test.com" />
      </div>

      <div class="form-group">
        <label>Username</label>
        <input type="text" name="username" value="jonman" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" name="password" value="password" />
      </div>

      <button type="button" click="component.signUp()">Sign Up</button>

    </form>
  `;
  userService: any;

  constructor () {
    this.userService = new UserService();
  }

  signUp () {
    const username = (<HTMLInputElement>document.querySelector('[name=register] [name=username]')).value;
    const password = (<HTMLInputElement>document.querySelector('[name=register] [name=password]')).value;
    const firstName = (<HTMLInputElement>document.querySelector('[name=register] [name=firstname]')).value;
    const lastName = (<HTMLInputElement>document.querySelector('[name=register] [name=lastname]')).value;
    const company = (<HTMLInputElement>document.querySelector('[name=register] [name=company]')).value;
    const email = (<HTMLInputElement>document.querySelector('[name=register] [name=email]')).value;
    const user = {
      username,
      password,
      firstName,
      lastName,
      company,
      email
    }
    this.userService.register(user).subscribe((r: any) => {});
  }
}
