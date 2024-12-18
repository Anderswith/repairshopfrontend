import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SignupService } from '../services/signup.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register-customer',
  standalone: true,
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css'],
  imports:[ReactiveFormsModule, CommonModule, ],
})
export class RegisterCustomerComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private signupService: SignupService) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
        ],
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      this.signupService
        .RegisterCustomer(
          formData.username,
          formData.password,
          formData.confirmPassword,
          formData.email,
          formData.phoneNumber,
          formData.firstName,
          formData.lastName
        )
        .subscribe({
          next: () => {
            alert('Registration successful!');
            window.location.reload();
          },
          error: (err) => alert('An error occurred: ' + err.message),
        });
    } else {
      alert('Please fill out the form correctly!');
    }
  }
}
