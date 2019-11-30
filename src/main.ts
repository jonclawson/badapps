import { Greeter } from './greeter';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

class App {
  view: HTMLElement;
  history: any;
  onpopstate: any;
  state: string;
  constructor (
    private routes: any[],
    private directives: any[]
  ) {
    this.view = document.querySelector('#app');
    this.history = window.history;
    this.onpopstate = window.onpopstate;
    this.init();

  }

  init () {
    const app = this;
    // window.addEventListener('onpopstate', (event: any) => {
    // window.onpopstate = function(event: any) {
    const pushState = history.pushState;
    history.pushState = function (state, title, url) {
      pushState.apply(history, [state, title, url]);
      console.log([state, title, url]);
      app.load(state);
    };

    // }
    // });
    this.load('');
  }

  render (elem: HTMLElement) {
    this.view.innerHTML = '';
    this.view.append(elem);
  }

  compile (component: any) {
    return this.compileComponent(component);
  }

  compileComponent(Component: any) {
    const component = new Component();
    const data = component.data ? component.data() : component
    const template = component.template;

    const elem = document.createElement('div');
    elem.innerHTML = template;
    const match = elem.innerHTML.match(/\{\{(.*)\}\}/g)
    if (match) {
      match.forEach(m => {
       const mv = m.replace(/\{\{/g, '').replace(/\}\}/g, '')
       elem.innerHTML = elem.innerHTML.replace(m, eval(mv))
      })
    }
    elem.querySelectorAll('[click]').forEach((e: any) => {
      const str = e.getAttribute('click');
     e.onclick = () => eval(str);
     e.removeAttribute('click');
    })
    this.compileDirectives(elem);
    return elem;
  }

  compileDirectives (elem: HTMLElement) {
    this.directives.forEach(d => {
      const directive = new d();
      const eDirs = elem.querySelectorAll(directive.selector);
      if (eDirs.length) {
        eDirs.forEach(eDir => {
          const dir = this.compileComponent(d);
          eDir.parentNode.replaceChild(dir, eDir);

        });
      }
    });
    return elem;
  }

  load (state: string) {
    this.state = state;
    const component = this.routes.filter(r => r.route === state)[0].component;
    const html = this.compile(component);
    this.render(html);
  }
}

const routes = [
  {
    route: '',
    component: Greeter
  },
  {
    route: '/profile',
    component: RegisterComponent
  }
];

const directives = [
  LoginComponent,
  RegisterComponent
];

const app = new App(routes, directives);
