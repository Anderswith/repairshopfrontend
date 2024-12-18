import {Component, Input, OnInit} from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormsModule } from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {Order} from '../Interfaces/order';
import {ChatComponent} from '../chat/chat.component';


type StatusType = 'pending' | 'technician assigned' | 'awaiting spare parts' | 'in progress' | 'complete';

@Component({
  selector: 'app-customerorder',
  templateUrl: './customerorder.component.html',
  styleUrls: ['./customerorder.component.css'],
  imports: [FormsModule, CommonModule, ChatComponent],
  providers: [DatePipe],
})
export class CustomerorderComponent implements OnInit {
  public activeOrderId: string = '';
  public activeCustomerId: string = '';
  public activeTechnicianId: string = '';
  Orders: any[] = [];
  public openChat = false;
  private statusMap: Record<StatusType, string> = {
    pending: '20%',
    'technician assigned': '40%',
    'awaiting spare parts': '60%',
    'in progress': '80%',
    complete: '100%',
  };

  constructor(private orderService: OrderService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadCustomerOrders();
  }
  loadCustomerOrders(): void {
    this.orderService.GetOrderByCustomerId().subscribe(
      (orders: Order[]) => {
        console.log('Orders received:', orders);
        this.Orders = orders.map((order: Order) => {
          order.expectedCompleteDate = this.formatDate(order.expectedCompleteDate);
          order.statusLabel = this.getStatusLabel(order.orderStatus);
          return order;
        });
      },
      (error) => {
        console.error('Error fetching customer orders', error);
        if (error.status === 500) {
          alert('Internal server error. Please try again later.');
        } else if (error.status === 404) {
          alert('No orders found.');
        }
      }
    );
  }
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || date; // If transformation fails, return the original date
  }

  getStatusLabel(status: number): string {
    console.log('Received status:', status);
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Technician assigned';
      case 3:
        return 'Awaiting spare parts';
      case 4:
        return 'In progress';
      case 5:
        return 'Complete';
      default:
        return 'Unknown';
    }
  }

  getProgressBarWidth(status: number): string {
    switch (status) {
      case 1: return '20%'; // Pending
      case 2: return '40%'; // Technician assigned
      case 3: return '60%'; // Awaiting spare parts
      case 4: return '80%'; // In progress
      case 5: return '100%'; // Complete
      default: return '0%'; // Unknown status
    }
  }
  openChatClicked(order: Order): void {
    console.log('Selected Order:', order);
    if (this.activeOrderId === order.orderId) {
      this.openChat = false;
      this.activeOrderId = '';
      this.activeCustomerId = '';
      this.activeTechnicianId = '';
    } else {
      this.openChat = true;
      this.activeOrderId = order.orderId;
      this.activeCustomerId = order.customerId;
      this.activeTechnicianId = order.technicianId;


      console.log('activeOrderId:', this.activeOrderId);
      console.log('activeCustomerId:', this.activeCustomerId);
      console.log('activeTechnicianId:', this.activeTechnicianId);
    }
  }

}
