// routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import BillPaymentForm from '../components/BillPaymentForm';
import PendingBillsView from '../components/PendingBillsView';
import ClientRegistrationForm from '../components/ClientRegistrationForm'; // Import the new component

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pay-bill" element={<BillPaymentForm />} />
      <Route path="/pending-bills" element={<PendingBillsView />} />
      <Route path="/register-client" element={<ClientRegistrationForm />} /> {/* Add this route */}
    </Routes>
  );
};

export default AppRoutes;
