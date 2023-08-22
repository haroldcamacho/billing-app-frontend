import React, { useState, useEffect } from 'react';
import { fetchBillsByClientId, fetchClients } from '../services/api';
import { PendingBill } from '../models/Bill';

const ClientBillsList: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | ''>('');
  const [availableClients, setAvailableClients] = useState<{ id: number; name: string }[]>([]);
  const [bills, setBills] = useState<PendingBill[]>([]);
  const [requestStatus, setRequestStatus] = useState<'success' | 'failure' | null>(null);

  useEffect(() => {
    const fetchAvailableClients = async () => {
      try {
        const clients = await fetchClients();
        setAvailableClients(clients);
      } catch (error) {
        console.error('Fetching available clients failed:', (error as Error).message);
      }
    };
    fetchAvailableClients();
  }, []);

  const handleFetchBills = async () => {
    try {
      if (selectedClientId === '') {
        return;
      }
      const fetchedBills = await fetchBillsByClientId(Number(selectedClientId));
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
        <h4>Select Client</h4>
        <select
          className="form-control"
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(e.target.value as number | '')}
        >
          <option value="">Select a client</option>
          {availableClients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
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
          No bills found for this client.
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
