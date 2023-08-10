// components/PendingBillsView.tsx
import React, { useState } from 'react';
import { fetchPendingBills } from '../services/api';
import { PendingBill } from '../models/Bill';

const PendingBillsView: React.FC = () => {
  const [clientId, setClientId] = useState<number>(0);
  const [pendingBills, setPendingBills] = useState<PendingBill[]>([]);

  const handleGetPendingBills = async () => {
    try {
      const bills = await fetchPendingBills(clientId);
      setPendingBills(bills);
    } catch (error) {
      console.error('Error fetching pending bills:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Pending Bills</h1>
      <div className="mb-3">
        <label htmlFor="clientIdInput">Client ID:</label>
        <input
          type="text"
          id="clientIdInput"
          className="form-control"
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
        />
      </div>
      <button className="btn btn-primary" onClick={handleGetPendingBills}>
        Get Pending Bills
      </button>
      <div className="mt-3">
        <h2>Pending Bills for Client ID {clientId}</h2>
        <ul>
          {pendingBills.map((bill) => (
            <li key={bill.id}>
              <div>Category: {bill.category}</div>
              <div>Month-Year: {new Date(bill.monthYear).toISOString().substring(0, 7).replace('-', '')}</div>
              <div>Amount: {bill.amount}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PendingBillsView;
