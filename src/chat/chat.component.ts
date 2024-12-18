import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {Chat} from '../Interfaces/chat';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports:[FormsModule, CommonModule]
})
export class ChatComponent implements OnInit {
  chats: Chat[] = [];
  @Input() orderId: string | undefined;
  @Input() customerId: string | undefined;
  @Input() technicianId: string | undefined;
  message: string='';

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    if (!this.orderId || !this.customerId || !this.technicianId) {
      console.error('Missing orderId, customerId, or technicianId for Chat');
    } else {
      console.log('orderId:', this.orderId);
      console.log('customerId:', this.customerId);
      console.log('technicianId:', this.technicianId);
      this.loadMessagesForOrder();
    }
  }

  loadMessagesForOrder() {
    if (!this.orderId) {
      console.error('No orderId provided to ChatComponent');
      return;
    }

    this.chatService.getChatForOrder(this.orderId).subscribe(
      (chatData) => {
        // If chatData is an array of objects, ensure we have the correct structure
        this.chats = chatData.map((chat: any) => ({
          ...chat,
          chatDate: new Date(chat.chatDate) // Ensure chatDate is a valid Date object
        }));
        console.log('Received chat data:', chatData);
      },
      (error) => {
        console.error('Error fetching chat messages:', error);
      }
    );
  }

  addChatMessageForOrder() {
    if (!this.orderId || !this.customerId || !this.technicianId) {
      console.error('Missing orderId, customerId, or technicianId for Chat');
      return;
    }

    this.chatService.addChatMessage(this.customerId, this.technicianId, this.orderId, this.message).subscribe(
      () => {
        console.log('Message sent successfully');
        this.message = ''; // Clear the input field after sending
        this.loadMessagesForOrder();  //reloads chat message
      },
      (error) => {
        console.error('Error sending chat message:', error);
      }
    );
  }
}
