import { Injectable } from '@angular/core';
import { UsersessionService } from './usersession.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userSessionService: UsersessionService) {}

  getUserRole(): string | null {
    const userSession = this.userSessionService.getUserSession();
    return userSession ? userSession.role : null;
  }
}
