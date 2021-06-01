import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
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
              @Inject('BASE_URL') private baseUrl: string, 
              private jwtHelperService: JwtHelperService
              ) {
  }

  login(loginContext: LoginContextInterface): Observable<string> {

    localStorage.removeItem("token");
    
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

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if(token) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    
    return false;
    
  }
  
  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    return of(true);
  }

}
