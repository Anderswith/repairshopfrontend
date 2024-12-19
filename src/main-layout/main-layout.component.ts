import {Component, OnInit} from '@angular/core';
import {UsersessionService} from '../services/usersession.service';
import {LoginComponent} from '../login/login.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CustomerdataComponent} from '../customerdata/customerdata.component';




@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [LoginComponent, CustomerdataComponent, NavbarComponent, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  userSession: any = null;
  isCustomer: boolean = false;
  isTechnician: boolean = false;
  isAdmin: boolean = false;

  constructor(private userSessionService: UsersessionService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.userSession = this.userSessionService.getUserSession();
    const userRole = this.authService.getUserRole();
    this.isCustomer = userRole === 'Customer';
    this.isTechnician = userRole === 'Technician';
    this.isAdmin = userRole === 'Admin';

  }

}
