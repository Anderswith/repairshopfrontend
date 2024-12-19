import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {TechnicianService} from '../services/technician.service';
import {Order} from '../Interfaces/order';
import {CommonModule} from '@angular/common';
import {LoginComponent} from '../login/login.component';
import {CustomerdataComponent} from '../customerdata/customerdata.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-available-orders',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, RouterModule],
  templateUrl: './available-orders.component.html',
  styleUrls: ['./available-orders.component.css'],
})
export class AvailableOrdersComponent implements OnInit {

  constructor(private orderService: OrderService, private technicianService: TechnicianService) { }
  ngOnInit() {
    this.ShowAllOrdersNotInProgress();
  }

  availableOrders: Order[] = [];

  toggleOrderDetails(order: any): void {
    order.showDetails = !order.showDetails;
  }

  beginWork(order: Order): void {

    if(!order){
      throw new Error("can't find order")
    }
    this.technicianService.AddTechnicianToOrder(order.orderId).subscribe({
      next: (response) => {
        console.log('Technician successfully assigned to order:', response);
      },
      error: (err) => {
        console.error('Error assigning technician to order:', err);
      }
    });
    window.location.reload();
  }

  ShowAllOrdersNotInProgress(): void {
    this.orderService.GetAllOrdersNotInProgress().subscribe({
      next: (orders: Order[]) => {
        this.availableOrders = orders;
      },
      error: (err: any) => {
        console.error('Error fetching orders:', err);
      }
    });
  }
}
