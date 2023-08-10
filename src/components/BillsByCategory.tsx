import React, { useState } from 'react';
import { fetchBillsByCategory } from '../services/api';

const BillsByCategoryForm: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [bills, setBills] = useState<Array<any>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetchBillsByCategory(category);
      if (response.length === 0) {
        setBills([]);
        setErrorMessage('No bills under that category');
      } else {
        setBills(response);
        setErrorMessage(null);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching bills:', error.message);
        setBills([]);
        setErrorMessage('Error fetching bills');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Search Bills by Category</h1>
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
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      {errorMessage && (
        <div className="alert alert-danger mt-2" role="alert">
          {errorMessage}
        </div>
      )}
      {bills.length > 0 && (
        <div className="mt-2">
          <h4>Found Bills:</h4>
          <ul>
            {bills.map((bill) => (
              <li key={bill.id}>
                ID: {bill.id}, Client ID: {bill.clientId}, Category: {bill.category}, Amount: {bill.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BillsByCategoryForm;
