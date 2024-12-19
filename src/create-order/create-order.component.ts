import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {
  username= ''
  itemName=''
  defect =''
  image = ''


  ngOnInit() {

  }

  constructor(private orderService : OrderService) { }

  Submit(username: string, itemName: string, defect: string, image: string): void {
    this.orderService.CreateOrder(this.username, this.itemName, this.defect, this.image).subscribe(
      (orderData) => {
        console.log('Order created successfully:', orderData);
        alert('Order created successfully!');
      },
      (error) => {
        console.error('Error saving order:', error);
        alert('Error saving order.');
      }
    );
  }

}
