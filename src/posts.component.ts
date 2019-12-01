import { postService } from './core.services';
import { userService } from './core.services';
import { Post } from './post.service';

export class PostsComponent {
  selector = 'posts';
  template = `
    <div>
      <div> {{data.title}}</div>
      <div> {{data.body}}</div>
    <div>
  `;
  posts: Post[];
  constructor () {
    const token = userService.token;
    if (token) {
      postService.getPosts().subscribe(posts => this.posts = posts);
    }
  }
}
