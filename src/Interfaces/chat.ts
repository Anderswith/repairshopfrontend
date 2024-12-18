export interface Chat {
  chatId: string;
  chatText: string;
  chatDate: string;  // Ensure the type matches your response format (string or Date)
  senderUsername: string;
  senderId: string;  // Make sure all properties are defined as per the response structure
  customerId: string;
  technicianId: string;
  orderId: string;
}
