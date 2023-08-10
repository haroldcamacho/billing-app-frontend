import React, { useState } from 'react';
import { fetchBillsByClientId } from '../services/api';
import { PendingBill } from '../models/Bill';

const ClientBillsList: React.FC = () => {
  const [clientId, setClientId] = useState<number | ''>('');
  const [bills, setBills] = useState<PendingBill[]>([]);
  const [requestStatus, setRequestStatus] = useState<'success' | 'failure' | null>(null);

  const handleFetchBills = async () => {
    try {
      if (clientId === '') {
        return;
      }
      const fetchedBills = await fetchBillsByClientId(Number(clientId));
      setBills(fetchedBills);
      setRequestStatus('success');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Fetching bills failed:', error.message);
        setRequestStatus('failure');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Client Bills List</h1>
      <div className="mb-3">
        <h4>Client ID</h4>
        <input
          type="number"
          className="form-control"
          placeholder="Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value as number | '')}
        />
      </div>
      <button className="btn btn-primary" onClick={handleFetchBills}>
        Fetch Bills
      </button>
      {requestStatus === 'success' && bills.length > 0 && (
        <div className="mt-2">
          <h4>Bills:</h4>
          <ul>
            {bills.map((bill) => (
              <li key={bill.id}>
                Category: {bill.category}, Amount: {bill.amount}, Status: {Number(bill.state) === 0 ? 'PENDING' : 'PAID'}
              </li>
            ))}
          </ul>
        </div>
      )}
      {requestStatus === 'success' && bills.length === 0 && (
        <div className="alert alert-info mt-2" role="alert">
          No bills found for this client ID.
        </div>
      )}
      {requestStatus === 'failure' && (
        <div className="alert alert-danger mt-2" role="alert">
          Failed to fetch bills.
        </div>
      )}
    </div>
  );
};

export default ClientBillsList;
