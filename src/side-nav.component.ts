import { stateService } from './core.services';


export class SideNavComponent {
    selector = 'side-nav';
    template = `
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" href="/">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/profile">Profile</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/post/create">Posts</a>
    </li>
  </ul>
    `;
    constructor () {}
}