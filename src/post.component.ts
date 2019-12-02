import { postService } from './core.services';

export class PostComponent {
  selector = 'post';
  template = `
  <h1>View Post</h1>
    <div>
      <div> {{data.title}}</div>
      <div> {{data.body}}</div>
    <div>
  `;
  post: any;
  constructor () {

  }

}
