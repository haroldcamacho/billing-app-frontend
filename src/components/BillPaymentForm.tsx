import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClients, fetchCategories, fetchUniquePendingDates, payBill, fetchPendingBills } from '../services/api';
import { setBills } from '../store/billingSlice';
import { PendingBill } from '../models/Bill';

const BillPaymentForm: React.FC = () => {
  const dispatch = useDispatch();
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pendingDates, setPendingDates] = useState<number[]>([]);
  const [selectedClient, setSelectedClient] = useState<number | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<number | ''>('');
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failure' | null>(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const clientData = await fetchClients();
        setClients(clientData);

        const categoryData = await fetchCategories();
        setCategories(categoryData);

        const pendingDateData = await fetchUniquePendingDates();
        setPendingDates(pendingDateData);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  const handlePayBill = async () => {
    if (!selectedClient || !selectedCategory || !selectedTimePeriod) {
      setPaymentStatus('failure');
      return;
    }

    try {
      await payBill(Number(selectedClient), selectedCategory, Number(selectedTimePeriod));
      const updatedBills: PendingBill[] = await fetchPendingBills(Number(selectedClient));
      dispatch(setBills(updatedBills));
      setPaymentStatus('success');
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failure');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Pay Bill Form</h1>
      <div className="mb-3">
        <label htmlFor="clientDropdown">Select Client:</label>
        <select
          id="clientDropdown"
          className="form-control"
          value={selectedClient}
          onChange={(e) => setSelectedClient(Number(e.target.value))}
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
        <label htmlFor="categoryDropdown">Select Category:</label>
        <select
          id="categoryDropdown"
          className="form-control"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="timePeriodDropdown">Select Time Period (YYYYMM):</label>
        <select
          id="timePeriodDropdown"
          className="form-control"
          value={selectedTimePeriod}
          onChange={(e) => setSelectedTimePeriod(Number(e.target.value))}
          >
          <option value="">Select a time period</option>
          {pendingDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handlePayBill}>
        Pay Bill
      </button>
      {paymentStatus === 'success' && (
        <div className="alert alert-success mt-2" role="alert">
          Payment Successful!
        </div>
      )}
      {paymentStatus === 'failure' && (
        <div className="alert alert-danger mt-2" role="alert">
          Payment Failed!
        </div>
      )}
    </div>
  );
};

export default BillPaymentForm;
