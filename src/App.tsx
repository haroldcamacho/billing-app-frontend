import React, { useState } from 'react';
import './App.css';
import BillPaymentForm from './components/BillPaymentForm';
import Home from './components/Home'; 
import PendingBillsView from './components/PendingBillsView';
import ClientRegistrationForm from './components/ClientRegistrationForm';
function App() {
  const [activeView, setActiveView] = useState<'home' | 'payBill' | 'pendingBills' | 'createClient'>('home');

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
        </div>
        {renderView()}
      </header>
    </div>
  );
}

export default App;
