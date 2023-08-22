import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import BillPaymentForm from './components/BillPaymentForm';
import Home from './components/Home'; 
import PendingBillsView from './components/PendingBillsView';
import ClientRegistrationForm from './components/ClientRegistrationForm';
import BillsByCategoryForm from './components/BillsByCategory';
import BillRegistrationForm from './components/BillRegistrationForm'; 
import ClientBillsList from './components/ClientBillsList';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'payBill' | 'pendingBills' | 'createClient' | 'billsByCategory'| 'registerBill'| 'clientBills'>('home');

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <Home />;
      case 'payBill':
        return <BillPaymentForm />;
      case 'pendingBills':
        return <PendingBillsView/>
      case 'createClient': 
        return <ClientRegistrationForm />;
      case 'billsByCategory':
        return <BillsByCategoryForm/>
      case 'registerBill':
        return <BillRegistrationForm />;
      case 'clientBills':
        return <ClientBillsList/>
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button className="btn btn-secondary" onClick={() => setActiveView('home')}>Home</button>
          <button className="btn btn-secondary" onClick={() => setActiveView('payBill')}>Pay Bill</button>
          <button className="btn btn-secondary" onClick={() => setActiveView('pendingBills')}>Pending Bills</button>
          <button className="btn btn-secondary" onClick={() => setActiveView('createClient')}>Create Client</button>
          <button className="btn btn-secondary" onClick={() => setActiveView('billsByCategory')}>Bills by Category</button>
          <button className="btn btn-secondary" onClick={() => setActiveView('registerBill')}>Register Bill</button> 
          <button className="btn btn-secondary" onClick={() => setActiveView('clientBills')}>Client Bills</button> 
        </div>
        {renderView()}
      </header>
    </div>
  );
}

export default App;
