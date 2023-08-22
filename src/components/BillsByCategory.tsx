import React, { useState, useEffect } from 'react';
import { fetchBillsByCategory, fetchCategories } from '../services/api';
import { PendingBill } from '../models/Bill';

const BillsByCategoryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [bills, setBills] = useState<PendingBill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoryData();
  }, []);

  const handleGetBillsByCategory = async () => {
    try {
      const bills = await fetchBillsByCategory(selectedCategory);
      setBills(bills);
      if (bills.length === 0) {
        setErrorMessage('No bills found for this category.');
      } else {
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching bills by category:', error);
      setErrorMessage('Failed to fetch bills by category.');
      setBills([]);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setBills([]);
    setErrorMessage('');
  };

  return (
    <div className="container mt-4">
      <h1>Search Bills by Category</h1>
      <div className="mb-3">
        <label htmlFor="categorySelect">Select Category:</label>
        <select
          id="categorySelect"
          className="form-control"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleGetBillsByCategory}>
        Search Bills
      </button>
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      {bills.length > 0 && (
        <div className="mt-3">
          <h2>Bills for Category: {selectedCategory}</h2>
          <ul>
            {bills.map((bill) => (
              <li key={bill.id}>
                <div>Client ID: {bill.clientId}</div>
                <div>Month-Year: {new Date(bill.monthYear).toISOString().substring(0, 7).replace('-', '')}</div>
                <div>Amount: {bill.amount}</div>
                <div>Status: {bill.state === '1' ? 'Paid' : 'Pending'}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BillsByCategoryView;
