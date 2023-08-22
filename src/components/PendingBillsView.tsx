import React, { useState, useEffect } from 'react';
import { fetchPendingBills, fetchClients } from '../services/api';
import { PendingBill } from '../models/Bill';

const PendingBillsView: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number>(0);
  const [pendingBills, setPendingBills] = useState<PendingBill[]>([]);
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientData = await fetchClients();
        setClients(clientData);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, []);

  const handleGetPendingBills = async () => {
    try {
      const bills = await fetchPendingBills(selectedClientId);
      setPendingBills(bills);
      if (bills.length === 0) {
        setErrorMessage('No pending bills for this client.');
      } else {
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching pending bills:', error);
      setErrorMessage('No pending bills.');
      setPendingBills([]);
    }
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClientId(Number(e.target.value));
    setPendingBills([]);
    setErrorMessage('');
  };

  return (
    <div className="container mt-4">
      <h1>Pending Bills</h1>
      <div className="mb-3">
        <label htmlFor="clientIdInput">Select Client:</label>
        <select
          id="clientIdInput"
          className="form-control"
          value={selectedClientId}
          onChange={handleClientChange}
        >
          <option value={0}>Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleGetPendingBills}>
        Get Pending Bills
      </button>
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      {pendingBills.length > 0 && (
        <div className="mt-3">
          <h2>Pending Bills for Client ID {selectedClientId}</h2>
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
      )}
      {pendingBills.length === 0 && !errorMessage && (
        <div className="mt-3"></div>
      )}
    </div>
  );
};

export default PendingBillsView;
