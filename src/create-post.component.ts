import { postService } from './core.services';

export class CreatePostComponent {
  selector = 'create-post';
  template = `
    <h1>Create a Post</h1>
    <div>
      <form name="create_post" onsubmit="return false;">
        <div class="form-group">
          <label>Title</label>
          <input name="post_title" />
        </div>
        <div class="form-group">
          <label>Body</label>
          <textarea name="post_body"></textarea>
        </div>
        <div class="form-group">
          <button click="data.save()">Save</button>
        </div>
      </form>
    <div>
  `;

  post: any;

  constructor () { }

  save () {
    const title = (<HTMLInputElement>document.querySelector('[name=create_post] [name=post_title]')).value;
    const body = (<HTMLInputElement>document.querySelector('[name=create_post] [name=post_body]')).value;
    const tags: any[] = [];
    const post = {
      title,
      body,
      tags
    };
    postService.createPost(post).subscribe((p: any) => {});
  }
}
