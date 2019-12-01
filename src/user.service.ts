import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { stateService } from './core.services';
import { StateService } from './state.service';

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

  constructor () {
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
        console.log('response: ', response);
      }),
      catchError(error => {
        console.log('error: ', error);
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
        console.log('response: ', response);
      }),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }

  profile () {
    return ajax({
      url: `${this.domain}/api/users/me`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token
      }
    }).pipe(
      map(response => {
        const user = response.response;
        console.log('user: ', user);
        this.user = user;
        return user;
      }),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }
}
