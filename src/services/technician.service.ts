import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UsersessionService} from './usersession.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  readonly baseUrl: string = 'http://localhost:5044/api';

  constructor(private http: HttpClient,private userSessionService: UsersessionService) { }

  AddTechnicianToOrder(orderId: string): Observable<any> {
    const userSession = this.userSessionService.getUserSession();
    if(!userSession){
      throw new Error("No user session");
    }

    const technicianId = userSession.userId;
    const token = userSession.token;
    const params = new HttpParams()
      .set('technicianId', technicianId)
      .set('orderId', orderId);

    return this.http.post(`${this.baseUrl}/Technician/AddTechnicianToOrder/`, null, {
      params: params,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });

  }

}
