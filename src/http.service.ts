import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export class HttpService {
  cache = new Map();
  constructor () {}

  getCache (key: string) {
    return this.cache.get(key);
  }

  setCache (key: string, value: any) {
    this.cache.set(key, value);
  }

  bustCache () {
    this.cache.clear();
  }

  ajax (request: {url: string, method: string, headers: any, body: any}) {
    const { url, method, headers, body } = request;
    switch (method) {
      case 'GET':
        return this.get(url, headers);
      case 'POST':
        return this.post(url, body, headers);
      case 'PUT':
        return this.put(url, body, headers);
      case 'DELETE':
        return this.delete(url, headers);
    }
  }

  get (url: string, headers: any) {
    const response = this.getCache(url);
    if (response) {
      return of(response);
    }
    else {
      return ajax({
        url: url,
        method: 'GET',
        headers: headers,
      }).pipe(
        map(response => {
          this.setCache(url, response);
          return response;
        }),
        catchError(error => {
          this.setCache(url, error);
          return of(error);
        })
      );
    }
  }

  post (url: string, body: any, headers: any) {
    this.bustCache();
    return ajax({
      url: url,
      method: 'POST',
      headers: headers,
      body: body
    });
  }

  put (url: string, body: any, headers: any) {
    this.bustCache();
    return ajax({
      url: url,
      method: 'PUT',
      headers: headers,
      body: body
    });
  }

  delete (url: string, headers: any) {
    this.bustCache();
    return ajax({
      url: url,
      method: 'DELETE',
      headers: headers,
    });
  }

}
