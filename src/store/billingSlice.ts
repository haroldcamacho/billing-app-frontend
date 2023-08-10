import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PendingBill } from '../models/Bill';

interface Bill {
  id: number;
  clientId: number;
  category: string;
  monthYear: string;
  state: string;
  amount: number;
}

interface BillingState {
  bills: Bill[];
  pendingBills: PendingBill[];
}

const initialState: BillingState = {
  bills: [],
  pendingBills: [],
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
    setPendingBills: (state, action: PayloadAction<PendingBill[]>) => {
      state.pendingBills = action.payload;
    },
  },
});

export const { setBills, setPendingBills } = billingSlice.actions;
export default billingSlice.reducer;
