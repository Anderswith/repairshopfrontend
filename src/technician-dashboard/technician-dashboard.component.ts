import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../Interfaces/order';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../services/order.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatComponent} from '../chat/chat.component';


@Component({
  selector: 'app-technician-dashboard',
  imports: [FormsModule, CommonModule, ChatComponent],
  standalone: true,
  templateUrl: './technician-dashboard.component.html',
  styleUrl: './technician-dashboard.component.css'
})
export class TechnicianDashboardComponent implements OnInit {
  myOrders: Order[] = [];
  availableOrders: Order[] = [];
  public activeOrderId: string = '';
  public activeCustomerId: string = '';
  public activeTechnicianId: string = '';
  public openChat = false;


  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.ShowOrdersForTechnician();
  }


  ShowOrdersForTechnician(): void {
    this.orderService.GetOrderByTechnicianId().subscribe((orderData: Order[]) => {
      console.log('fetching:', orderData);
      this.myOrders = orderData.map((order: Order) => {
        const statusLabel = this.GetStatusLabel(order.orderStatus);
        return {
          ...order,
          statusLabel,  // Add the statusLabel to the order object
          showDetails: false  // For toggling details visibility
        };
      });
    }, error => {
      console.error('Error fetching technician data:', error);
    });
  }

  GetStatusLabel(status: number): string {
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

  getStatusNumber(statusLabel: string): number {
    switch (statusLabel) {
      case 'Pending':
        return 1;
      case 'Technician assigned':
        return 2;
      case 'Awaiting spare parts':
        return 3;
      case 'In progress':
        return 4;
      case 'Complete':
        return 5;
      default:
        return -1;
    }
  }

  SubmitChanges(order: Order): void {
    // Convert the statusLabel to the corresponding status number for the specific order
    if (!order.statusLabel) {
      console.error('Status label is not set');
      return;
    }
    const statusNumber = this.getStatusNumber(order.statusLabel || '');

    if (statusNumber === -1) {
      console.error('Invalid status label');
      return;
    }

    // Update order status
    this.orderService.ChangeOrderStatus(order.orderId, statusNumber).subscribe(
      (response) => {
        console.log('Order status updated successfully', response);
      },
      (error) => {
        console.error('Error updating order status', error);
      }
    );

    // Update order comment
    this.orderService.ChangeOrderComment(order.orderId, order.comment).subscribe(
      (response) => {
        console.log('Order comment updated successfully', response);
      },
      (error) => {
        console.error('Error updating order comment', error);
      }
    );

    // Update expected completion date
    this.orderService.ChangeExpectedCompleteDate(order.orderId, order.expectedCompleteDate).subscribe(
      (response) => {
        console.log('Order expected completion date updated successfully', response);
      },
      (error) => {
        console.error('Error updating order expected completion date', error);
      }
    );
  }

  toggleOrderDetails(order: any): void {
    order.showDetails = !order.showDetails;
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

