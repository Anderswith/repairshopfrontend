import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-customerdata',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './customerdata.component.html',
  styleUrl: './customerdata.component.css'
})
export class CustomerdataComponent implements OnInit {
  email: string = '';
  phoneNumber: string = '';
  firstName: string = '';
  lastName: string = '';
  isReadOnly: boolean = true;


  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomerData();
  }


  loadCustomerData(){
    this.customerService.getCustomerData().subscribe((
      customerData )=> {
      this.email = customerData.email;
      this.phoneNumber = customerData.phoneNumber;
      this.firstName = customerData.firstName;
      this.lastName = customerData.lastName;
      },
      (error) =>{
      console.error('error fetching customer data:', error)
      }
    )
  }
  toggleEditMode(): void {
    this.isReadOnly = !this.isReadOnly;
    if (this.isReadOnly) {
      this.saveChanges();
    }
  }

  saveChanges() {
    this.customerService.updateCustomerData(this.email, this.phoneNumber, this.firstName, this.lastName).subscribe(
      (userData) => {
        this.email = userData.email;
        this.phoneNumber = userData.phoneNumber;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
      },
      (error) => {
        alert('Error saving changes.');
      }
    );
  }
}
