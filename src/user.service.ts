import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpService } from './http.service';
import { stateService } from './core.services';

export class User {
  firstName: string;
  lastName: string;
  company: string;
  username: string;
  email: string;
  password: string;
}

export class UserService {
  domain = '//localhost:8080';
  token: string;
  user: User;
  users: User[];

  constructor (private http: HttpService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.profile().subscribe(u => u);
    }
  }

  logout () {
    localStorage.clear();
    stateService.go('');
    location.reload();
  }

  login (username: string, password: string) {
    return ajax({
      url: `${this.domain}/api/auth/signin`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        usernameOrEmail: username,
        password: password
      }
    }).pipe(
      map(response => {
        const { tokenType, accessToken } = response.response;
        this.token = `${tokenType} ${accessToken}`;
        localStorage.setItem('token', this.token);
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  register (user: User) {
    // {"firstName": "jone", "lastName": "mann", "username": "jonman", "password": "password", "email": "jonman@test.com"}
    return ajax({
      url: `${this.domain}/api/auth/signup`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: user
    }).pipe(
      map(response => {
        return response.response;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  profile () {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.token
    };
    return this.http.get(`${this.domain}/api/users/current`, headers).pipe(
      map(response => {
        const user = response.response;
        this.user = user;
        return user;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getUsers () {
    return ajax({
      url: `${this.domain}/api/users`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token
      }
    }).pipe(
      map(response => {
        const users = response.response;
        this.users = users;
        return users;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
}
