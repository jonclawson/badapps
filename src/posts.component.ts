import { postService } from './core.services';
import { userService } from './core.services';
import { Post } from './post.service';

export class PostsComponent {
  selector = 'posts';
  template = `
    <h2>Posts</h2>
    <div for="post of data.posts">
      <div>title: {post.title}</div>
      <div>body: {post.body}</div>
    <div>
  `;
  posts: Post[];
  constructor () {
    const token = userService.token;
    if (token) {
      postService.getPosts().subscribe((posts: Post[]) => this.posts = posts);
    }
  }
}
