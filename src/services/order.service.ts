import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersessionService } from './usersession.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly baseUrl: string = 'http://localhost:5044/api';

  constructor(private http: HttpClient, private userSessionService: UsersessionService) {}

  GetOrderByCustomerId(): Observable<any> {
    const userSession = this.userSessionService.getUserSession();

    if (!userSession) {
      throw new Error('No user logged in');
    }

    const userId = userSession.userId;
    const token = userSession.token;

    if (!userId) {
      throw new Error('No user id found in session');
    }

    // Use HttpParams for query string parameters
    const params = new HttpParams().set('customerId', userId);

    return this.http.get(`${this.baseUrl}/Order/GetOrderByUserId`, {
      params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  GetOrderByTechnicianId(): Observable<any> {
    const userSession = this.userSessionService.getUserSession();
    if (!userSession) {
      throw new Error('No user logged in');
    }
    const techId = this.userSessionService.getUserId();
    const token =  userSession.token;
    if(techId === null) {
      throw new Error('No tech id found in session');
    }
    return this.http.get(`${this.baseUrl}/Order/GetOrderListForTechnician/`, {
      params: { technicianId: techId },
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  ChangeOrderStatus(orderId: string, orderStatus: number):Observable<any> {
    const userSession = this.userSessionService.getUserSession();
    if (!userSession) {
      throw new Error('No user logged in');
    }
    const token =  userSession.token;
    const params = new HttpParams()
      .set('orderId', orderId)
      .set('orderStatus', orderStatus.toString())

    return this.http.put(`${this.baseUrl}/Order/ChangeOrderStatus/`, null, {
      params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}` // Include the token here
      })
    });

  }

  ChangeOrderComment(orderId: string, comment: string): Observable<any> {
    const userSession = this.userSessionService.getUserSession();
    if (!userSession) {
      throw new Error('No user logged in');
    }

    const token = userSession.token;
    const params = new HttpParams()
      .set('orderId', orderId)
      .set('comment', comment);

    return this.http.put(`${this.baseUrl}/Order/AddCommentToOrder/`, null, {
      params: params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  ChangeExpectedCompleteDate(orderId: string, expectedCompleteDate: string):Observable<any> {
    const userSession = this.userSessionService.getUserSession();
    if (!userSession) {
      throw new Error('No user logged in');
    }
    const token = userSession.token;
    const params = new HttpParams()
      .set('orderId', orderId)
      .set('expectedCompleteDate', expectedCompleteDate);


    return this.http.put(`${this.baseUrl}/Order/AddExpectedCompleteDateToOrder/`, null, {
      params: params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

}
