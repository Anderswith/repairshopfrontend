export interface Order {
  orderId: string;
  customerId: string;
  technicianId: string;
  itemName: string;
  defect: string;
  comment: string;
  orderStatus: number;
  image: string;
  orderNumber: number;
  expectedCompleteDate: string;
  technicianName: string;

  statusLabel?: string;
  showDetails: boolean;
}
