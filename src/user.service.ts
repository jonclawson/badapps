import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

class User {
  firstName: string
  lastName: string
  company: string
  username: string
  email: string
  password: string
}

export class UserService {
  domain = '//localhost:8080'
  user: User
  users: User[]
  constructor () {}

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
        console.log('response: ', response)
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
        console.log('response: ', response)
      }),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }
}
