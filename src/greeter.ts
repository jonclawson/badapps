
import { StateService } from './state'

export class Greeter {
    template = `
    <a click="data.home()" style="cursor: pointer;">hello {{data.name}}</a>
    <a click="data.profile()" style="cursor: pointer;">hello {{data.name}}</a>
    <login></login>
    <register></register>
    `;
    name = 'Tom';
    state: any;
    constructor() {
      this.state = new StateService();
    }

    data () {
      const d = this
      return {
        name: 'tom',
        home () {
          d.state.go('/')
        },
        profile () {
          d.state.go('/profile');
        }
      }
    }


}
