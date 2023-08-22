export interface Bill {
    id: number;
    clientId: number;
    category: string;
    monthYear: string; 
    state: string;
    amount: number;
  }
  
  export interface PendingBill extends Bill {
  }
  
  export interface PaidBill extends Bill {
  }
  