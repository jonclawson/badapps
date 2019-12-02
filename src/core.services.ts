
import { HttpService } from './http.service';
import { StateService } from './state.service';
import { UserService } from './user.service';
import { PostService } from './post.service';

export const httpService = new HttpService();
export const stateService = new StateService();
export const userService = new UserService(httpService);
export const postService = new PostService(httpService);
