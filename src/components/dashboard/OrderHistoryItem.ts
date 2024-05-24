export interface OrderHistoryItem {
    orderId: number;
    orderStatus: string;
    toFullName: string;
    toAddress: string;
    deliveryDate: string; // or Date if you prefer
    orderDate: string; // or Date if you prefer
  }
  