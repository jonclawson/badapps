import { postService } from './core.services';

export class PostComponent {
  selector = 'post';
  template = `
    <div>
      <div> {{data.title}}</div>
      <div> {{data.body}}</div>
    <div>
  `;
  post: any;
  constructor () {

  }

}
