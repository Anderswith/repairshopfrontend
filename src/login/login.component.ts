import {ChangeDetectorRef, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router, RouterModule} from '@angular/router';
import {UsersessionService} from '../services/usersession.service';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private loginService: LoginService, private router: Router, private userSession: UsersessionService, private cdr: ChangeDetectorRef,private authService: AuthService) {}

  Loginbuttonclick() {

    this.loginService.login(this.username, this.password).subscribe(
      response => {
        if (response.token && response.userId && response.username) {
          this.userSession.storeUserSession(response.userId, response.username, response.token);
          this.successMessage = 'Login successful!';
          console.log("success")
          this.cdr.detectChanges();
          }
        const username = this.userSession.getUsername();


        if (this.authService.getUserRole() === 'Customer') {
          this.router.navigate(['/main-layout/customer', username]);
        } else if (this.authService.getUserRole() === 'Technician') {
          this.router.navigate(['/main-layout/technician', username]);
        } else {
          // Handle other roles or invalid sessions
          console.error('Invalid role');
        }
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

}
