
import { StateService } from './state'

export class Greeter {
    template = `
    <a data-click="home()">hello {name}</a>
    <a data-click="profile()">hello {name}</a>
    <login></login>
    <register></register>
    `;
    name = 'Tom';
    state: any;
    constructor() {
      this.state = new StateService();
    }

    home () {
      this.state.go('/')
    }
    profile () {
      this.state.go('/profile');
    }
}
