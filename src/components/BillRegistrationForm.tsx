import React, { useState, useEffect } from 'react';
import { registerBill, fetchClients, fetchCategories } from '../services/api';

const BillRegistrationForm: React.FC = () => {
  const [clientId, setClientId] = useState<number | ''>('');
  const [category, setCategory] = useState<string>('');
  const [period, setPeriod] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [registrationStatus, setRegistrationStatus] = useState<'success' | 'failure' | null>(null);
  const [registeredBill, setRegisteredBill] = useState<any | null>(null);
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientData = await fetchClients();
        setClients(clientData);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchClientData();
    fetchCategoryData();
  }, []);

  const handleRegisterBill = async () => {
    try {
      const response = await registerBill(Number(clientId), category, period, amount);
      setRegisteredBill(response);
      setRegistrationStatus('success');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Bill registration failed:', error.message);
        setRegistrationStatus('failure');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Bill Registration Form</h1>
      <div className="mb-3">
        <h4>Client ID</h4>
        <select
          className="form-select"
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <h4>Category</h4>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <h4>Period (YYYYMM)</h4>
        <input
          type="number"
          className="form-control"
          placeholder="Period (YYYYMM)"
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <h4>Amount</h4>
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <button className="btn btn-primary" onClick={handleRegisterBill}>
        Register Bill
      </button>
      {registrationStatus === 'success' && (
        <div className="alert alert-success mt-2" role="alert">
          Your bill was created!
        </div>
      )}
      {registeredBill && (
        <div className="mt-2">
          <h4>Registered Bill Information:</h4>
          <p>Bill ID: {registeredBill.id}</p>
          <p>Client ID: {registeredBill.clientId}</p>
          <p>Category: {registeredBill.category}</p>
          <p>Period: {registeredBill.monthYear}</p>
          <p>Amount: {registeredBill.amount}</p>
          <p>Status: {registeredBill.state === 0 ? 'PENDING' : 'PAID'}</p>
        </div>
      )}
    </div>
  );
};

export default BillRegistrationForm;
