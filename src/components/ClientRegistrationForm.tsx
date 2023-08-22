import React, { useState } from 'react';
import { createClient } from '../services/api';

const ClientRegistrationForm: React.FC = () => {
  const [clientId, setClientId] = useState<number | ''>('');
  const [clientName, setClientName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterClient = async () => {
    if (clientId === '' || clientId < 0 || !clientName) {
      setErrorMessage('Please provide a valid client ID and name.');
      return;
    }

    try {
      await createClient(Number(clientId), clientName);
      setClientId('');
      setClientName('');
      setErrorMessage('');
      // Display success message or navigate to a different page
    } catch (error) {
      console.error('Error registering client:', error);
      setErrorMessage('Failed to register client.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Client Registration</h1>
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      <div className="mb-3">
        <h4>Client ID</h4>
        <input
          type="number"
          className="form-control"
          placeholder="Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value as number | '')}
        />
      </div>
      <div className="mb-3">
        <h4>Client Name</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleRegisterClient}>
        Register Client
      </button>
    </div>
  );
};

export default ClientRegistrationForm;
