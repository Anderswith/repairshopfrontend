import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UsersessionService} from './usersession.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:5044/api';

  constructor(private http: HttpClient, private userSessionService: UsersessionService) { }

  getCustomerData(): Observable<any> {
    const userSession = this.userSessionService.getUserSession();

    if(!userSession)
    {
      throw new Error('No user logged in');
    }
    const userId = userSession.userId;
    const token = userSession.token;
    if(userId === null){
      throw new Error('No user logged in');
    }

    return this.http.get(`${this.baseUrl}/User/GetUserData/${userId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  updateCustomerData( email: string, phoneNumber: string, firstName: string, lastName: string): Observable<any> {
    const userSession = this.userSessionService.getUserSession();
    if(!userSession){
      throw new Error('No user logged in');
    }
    const userId = this.userSessionService.getUserId();
    const token = userSession.token;
    if(!userId){
      throw new Error('couldnt find user Id');
    }
    const params = new HttpParams()
      .set('userId', userId)
      .set('email', email)
      .set('phoneNumber', phoneNumber)
      .set('firstName', firstName)
      .set('lastName', lastName);

    return this.http.put(`${this.baseUrl}/User/UpdateUserData`, null, {
      params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  GetCustomerByUsername(username: string): Observable<any> {
    const userSession = this.userSessionService.getUserSession();
    if(!userSession){
      throw new Error('No user logged in');
    }
    const token = userSession.token;
    const params = new HttpParams()
      .set('username', username)

    return this.http.get(`${this.baseUrl}/User/GetUserByUsername`, {
      params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })

  }
}
