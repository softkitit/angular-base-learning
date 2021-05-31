import {HttpClient, HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

interface LoginContextInterface {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              @Inject('BASE_URL') private baseUrl: string) {
  }

  login(loginContext: LoginContextInterface): Observable<string> {

    const params = new URLSearchParams();
    params.append('username', loginContext.username);
    params.append('password', loginContext.password);
    
    return this.httpClient.post(`${this.baseUrl}/users/signin?${params.toString()}`,
      null,
      {responseType: 'text'}
    ).pipe(map(v => v as string), tap(token => {
      localStorage.setItem('token', token);
    }));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    return of(true);
  }

}
