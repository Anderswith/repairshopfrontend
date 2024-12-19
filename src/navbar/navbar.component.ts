import { Component } from '@angular/core';
import {UsersessionService} from '../services/usersession.service';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCustomer: boolean = false;
  isAdmin: boolean = false;
  isTechnician: boolean = false;
  userSession: any = null;
  username: string ='';

  constructor(private userSessionService: UsersessionService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSession = this.userSessionService.getUserSession();
    if (this.userSession && this.authService.getUserRole() === 'Customer') {
      this.isCustomer = true;
    }
    if (this.userSession && this.authService.getUserRole() === 'Admin') {
      this.isAdmin = true;
    }
    if (this.userSession && this.authService.getUserRole() === 'Technician') {
      this.isTechnician = true;
    }
    this.username = this.userSessionService.getUsername() || '';

  }

  LogOut(){
    this.userSessionService.removeUserSession();
    this.router.navigate(['main-layout']);
    this.UpdateUserSession();
  }

  UpdateUserSession() {
    this.userSession = null;
  }

}
