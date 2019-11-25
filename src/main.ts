import { Greeter } from './greeter';
import { LoginComponent } from './login.component'
import { RegisterComponent } from './register.component'

class App {
  view: HTMLElement
  history: any
  onpopstate: any
  state: string
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
    this.onpopstate = function(event: any) {
      console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
      app.load(event.state);
    }
    this.load('');
  }

  render (elem: HTMLElement) {
    this.view.innerHTML = '';
    this.view.append(elem);
  }

  registerEvents (elem: HTMLElement, component: any) {
    const eClicks = elem.querySelectorAll('[data-click]');
    eClicks.forEach((e: any) => {
      const methodName = e.dataset.click.replace(/\(.*\)/, '');
      if (component[methodName]) {
        e.removeAttribute('data-click')
        e.onclick = () => {
          return component[methodName]();
        }
      }
    })
  }

  compile (component: any) {
    return this.compileComponent(component);
  }

  compileComponent(component: any) {
    const data = new component();
    const template = data.template;
    let html = template;
    const props = Object.keys(data)
    props.forEach(k => {
      if (k !== 'template' && k !== 'selector') {
        const regex = new RegExp(`\{${k}\}`, 'g');
        html = html.replace(regex, data[k]);
      }
    })
    const elem = document.createElement('div');
    elem.innerHTML = html;
    this.registerEvents(elem, data);
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

        })
        // html = html.replace(directive.selector, dir.innerHTML);
      }
    })
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
  }
];

const directives = [
  LoginComponent,
  RegisterComponent
];

const app = new App(routes, directives);
