import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { payBill, fetchPendingBills } from '../services/api';
import { setBills } from '../store/billingSlice';

const BillPaymentForm: React.FC = () => {
  const dispatch = useDispatch();
  const [clientId, setClientId] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [period, setPeriod] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failure' | null>(null);

  const handlePayBill = async () => {
    try {
      await payBill(clientId, category, period);
      const updatedBills = await fetchPendingBills(clientId);
      dispatch(setBills(updatedBills));
      setPaymentStatus('success');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Payment failed:', error.message);
        setPaymentStatus('failure');
      }
    }
  };

  useEffect(() => {
    if (paymentStatus) {
      const timeout = setTimeout(() => {
        setPaymentStatus(null);
      }, 5000); 
      return () => clearTimeout(timeout);
    }
  }, [paymentStatus]);

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Pay Bill Form</h1>
      <h4>Client ID</h4>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Client ID"
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <h4>Category</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <h4>Time Period (YYYYMM)</h4>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Period (YYYYMM)"
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
        />
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
