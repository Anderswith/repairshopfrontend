import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersessionService} from './usersession.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  readonly baseUrl: string = 'http://localhost:5044/api'
  constructor(private http: HttpClient, private userSessionService: UsersessionService) { }

  RegisterCustomer(userName: string, password: string, confirmPassword: string, email: string, phoneNumber: string, firstName: string, lastName: string) : Observable<any>
  {
    const userSession = this.userSessionService.getUserSession();
    if (!userSession) {
      throw new Error('No user logged in');
    }
    const token = userSession.token;
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password)
      .set('confirmPassword', confirmPassword)
      .set('email', email)
      .set('phoneNumber', phoneNumber)
      .set('firstName', firstName)
      .set('lastName', lastName)
    return this.http.post(`${this.baseUrl}/User/CreateCustomer/`, null, {params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })});
  }

}
