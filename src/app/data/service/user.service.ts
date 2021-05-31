import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {SignUpRequest, User} from '@data/schema/user';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
  }

  userInformation(): Observable<User> {
    return this.httpClient.get(`${this.baseUrl}/users/me`) as Observable<User>;
  }

  signup(request: SignUpRequest): Observable<string> {
    // default role is client
    request.roles = [
      'ROLE_CLIENT'
    ];

    return this.httpClient.post(`${this.baseUrl}/users/signup`,
      request,
      {responseType: 'text'}
    ) as Observable<string>;

  }
}
