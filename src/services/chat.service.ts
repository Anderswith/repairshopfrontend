import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersessionService} from './usersession.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly baseUrl: string = 'http://localhost:5044/api';
  constructor(private http: HttpClient, private userSessionService: UsersessionService) { }

  getChatForOrder(orderId: string): Observable<any> {
    const userSession = this.userSessionService.getUserSession();

    if (!userSession) {
      throw new Error('No user logged in');
    }

    const token = userSession.token;

    return this.http.get(`${this.baseUrl}/Chat/GetChatMessagesForOrder`, {
      params: { orderId: orderId },
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }


  addChatMessage(customerId: string, technicianId: string, orderId: string, message: string): Observable<any> {
    const userSession = this.userSessionService.getUserSession();
    if(!userSession){
      throw new Error('No user logged in');
    }
    const token = userSession.token
    const senderId = userSession.userId
    if(!senderId){
      throw new Error('couldnt find user Id');
    }
    const params = new HttpParams()
      .set('senderId', senderId)
      .set('customerId', customerId)
      .set('technicianId', technicianId)
      .set('orderId', orderId)
      .set('message', message);

    return this.http.post(`${this.baseUrl}/Chat/AddChatMessage`, null, { params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }
}
