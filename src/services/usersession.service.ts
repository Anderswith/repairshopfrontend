import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class UsersessionService {
  private userSession: { userId: string; username: string; token: string; role: string;} | null = null;


  constructor() {
    this.userSession = this.getUserSession();
  }

  storeUserSession(userId: string, username: string, token: string): void {
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    const role = decodedToken.role|| [];
    this.userSession = { userId, username, token, role  };
    localStorage.setItem('userSession', JSON.stringify(this.userSession));
  }

  getUserSession() {
    if (!this.userSession) {
      const storedSession = localStorage.getItem('userSession');
      this.userSession = storedSession ? JSON.parse(storedSession) : null;
    }
    return this.userSession;
  }
  removeUserSession(): void {
    this.userSession = null;
    localStorage.removeItem('userSession');
  }

  getUserId() {
    const session = this.getUserSession();
    return session ? session.userId : null;
  }

  getRole() {
    const session = this.getUserSession();
    return session ? session.role : null;
  }

  getUsername() {
    const session = this.getUserSession();
    return session ? session.username : null;
  }
}
