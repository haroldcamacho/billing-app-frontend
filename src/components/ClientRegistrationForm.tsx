import React, { useState } from 'react';
import { createClient } from '../services/api';

const ClientRegistrationForm: React.FC = () => {
  const [clientId, setClientId] = useState<number>(0);
  const [clientName, setClientName] = useState<string>('');
  const [registrationStatus, setRegistrationStatus] = useState<'success' | 'failure' | null>(null);

  const handleRegisterClient = async () => {
    try {
      await createClient(clientId, clientName);
      setRegistrationStatus('success');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Client registration failed:', error.message);
        setRegistrationStatus('failure');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Client Registration Form</h1>
      <div className="mb-3">
        <h4>Client ID</h4>
        <input
          type="number"
          className="form-control"
          placeholder="Client ID"
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
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
      {registrationStatus === 'success' && (
        <div className="alert alert-success mt-2" role="alert">
          Client Registered Successfully!
        </div>
      )}
      {registrationStatus === 'failure' && (
        <div className="alert alert-danger mt-2" role="alert">
          Client Registration Failed!
        </div>
      )}
    </div>
  );
};

export default ClientRegistrationForm;
