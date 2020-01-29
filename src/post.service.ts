import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpService } from './http.service';

export class Post {
  title: string;
  body: string;
}
export class PostService {
  post: any;
  posts: any[];
  token: string;
  domain: string = '//localhost:8080';
  constructor (private http: HttpService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
  }
  createPost (post: Post) {
    return ajax({
      url: `${this.domain}/api/posts`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token
      },
      body: post
    }).pipe(
      map(response => {
        const post = response.response;
        return post;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  updatePost (id: string) {
    return ajax({
      url: `${this.domain}/api/posts/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token
      }
    }).pipe(
      map(response => {
        const post = response.response;
        return post;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getPosts () {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.token
    };
    return this.http.get(`${this.domain}/api/posts`, headers).pipe(
      map(response => {
        const posts = response.response.content;
        return posts;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getPost (id: string) {
    return ajax({
      url: `${this.domain}/api/posts/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token
      }
    }).pipe(
      map(response => {
        const post = response.response;
        return post;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
}
