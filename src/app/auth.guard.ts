import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {UsersessionService} from '../services/usersession.service';
import {Injectable} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSessionService: UsersessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const session = this.userSessionService.getUserSession();
    const expectedRole = route.data['role'];


    if (session && session.role === expectedRole) {
      return true;
    }
    return false;
  }
}
