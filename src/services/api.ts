import axios from 'axios';
import { PendingBill } from '../models/Bill';
const API_BASE_URL = 'http://localhost:5000';

export const fetchPendingBills = async (clientId: number): Promise<PendingBill[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/billing/pending?ClientId=${clientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const payBill = async (clientId: number, category: string, period: number) => {
  const response = await fetch(`${API_BASE_URL}/billing/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ clientId, category, period }),
  });

  if (!response.ok) {
    throw new Error('Payment failed.');
  }
};

export const createClient = async (clientId: number, name: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/billing/clients`, {
        clientId,
        name,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const fetchBillsByCategory = async (category: string): Promise<PendingBill[]> => {
try {
    const response = await axios.get(`${API_BASE_URL}/billing/search?category=${category}`);
    return response.data;
} catch (error) {
    throw error;
}
};

export const fetchPendingBillsById = async (clientId: number) => {
  try {
    const response = await axios.get(`/billing/pending?clientId=${clientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerBill = async (clientId: number, category: string, period: number, amount: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/billing/bills`, {
      clientId,
      category,
      period,
      amount,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBillsByClientId = async (clientId: number): Promise<PendingBill[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/billing/client/${clientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};