// models/Bill.ts
export interface Bill {
    id: number;
    clientId: number;
    category: string;
    monthYear: string; // You can adjust the data type based on your API response
    state: string; // You can use an enum or a specific type for the state
    amount: number;
  }
  
  export interface PendingBill extends Bill {
    // Additional properties specific to pending bills, if needed
  }
  
  export interface PaidBill extends Bill {
    // Additional properties specific to paid bills, if needed
  }
  