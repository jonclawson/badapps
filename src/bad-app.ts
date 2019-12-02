import { stateService } from './core.services';
export class BadApp {
  elem: HTMLElement;
  history: any;
  onpopstate: any;
  state: string;
  constructor (
    private routes: any[],
    private directives: any[]
  ) {
    this.elem = document.querySelector('#app');
    this.history = window.history;
    this.onpopstate = window.onpopstate;
    this.init();

  }

  init () {
    const app = this;
    const pushState = history.pushState;
    history.pushState = function (state, title, url) {
      pushState.apply(history, [state, title, url]);
      app.load(state);
    };
    // window.addEventListener('onpopstate', (event: any) => {
    window.onpopstate = function(event: any) {
      app.load(event.state);
    };
    // });
    this.load(stateService.state);
  }

  render (elem: HTMLElement) {
    this.compileDirectives(this.elem);
    const view = this.elem.querySelector('view-main');
    view.innerHTML = '';
    view.append(elem);
  }

  compile (component: any) {
    return this.compileComponent(component);
  }

  compileComponent(Component: any) {
    // TODO: Learn how to inject dependencies.
    // type GetConstructorArgs<T> = T extends new (...args: infer U) => any ? U : never
    // type FooConstructorArgs = GetConstructorArgs<typeof Component> // [string, number]
    // const deps = [..getDepedencies(FooConstructorArgs)]
    // const component = new Component(...deps);

    const component = new Component();
    const elem = document.createElement('div');
    this.renderComponent(component, elem);
    let copy = Object.assign({}, component);
    setInterval(() => {
      if (JSON.stringify(copy) !== JSON.stringify(component)) {
        this.renderComponent(component, elem);
        copy = Object.assign({}, component);
      }
    });
    return elem;
  }

  renderComponent (component: any, elem: HTMLElement) {
    const data = component.data ? component.data() : component; // alias for templates
    const template = component.template;
    elem.innerHTML = template;
    elem.querySelectorAll('[if]').forEach((e: any) => {
      const str = e.getAttribute('if');
      // TODO: replace eval
      const result = eval(str);
      if (!result) {
        e.parentNode.removeChild(e);
      }
     e.removeAttribute('if');
   });
   elem.querySelectorAll('[for]').forEach((e: any) => {
     const exps = e.getAttribute('for').split('of');
     let html = e.innerHTML;
     const items = eval(exps[1].trim());

    if (items) {
      e.innerHTML = '';
     for (let item of items) {
       const match = html.match(/\{(.*)\}/g);
       if (match) {
         match.forEach((m: any) => {
          const mv = m.replace(/\{/g, '').replace(/\}/g, '').replace(exps[0].trim(), 'item');
          // TODO: replace eval
          html = html.replace(m, sanitizeHTML(eval(mv)));
        });
       }
       e.innerHTML += html;
     }
    }
    e.removeAttribute('for');
  });
    const match = elem.innerHTML.match(/\{\{(.*)\}\}/g);
    if (match) {
      match.forEach(m => {
       const mv = m.replace(/\{\{/g, '').replace(/\}\}/g, '');
       // TODO: replace eval
       elem.innerHTML = elem.innerHTML.replace(m, sanitizeHTML(eval(mv)));
     });
    }
    elem.querySelectorAll('[click]').forEach((e: any) => {
      const str = e.getAttribute('click');
      // TODO: replace eval
     e.onclick = () => eval(str);
     e.removeAttribute('click');
   });
    this.compileDirectives(elem);
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
    this.state = !state ? '' : state;
    const component = [...this.routes.filter(r => r.route === this.state), ...this.routes.filter(r => r.route === '')][0].component;
    const elem = this.compile(component);
    this.render(elem);
  }
}


function sanitizeHTML (str: string) {
  var temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}
