import React, { useState } from 'react';
import './css/App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import ViewInvoice from './components/ViewInvoice';

function App() {
  const [invoiceId, setInvoiceId] = useState('');

  return (
    <div className="app">
      <Sidebar />
      <Main
        invoiceId={invoiceId}
        setInvoiceId={setInvoiceId}
      />
      <ViewInvoice
        invoiceId={invoiceId}
        setInvoiceId={setInvoiceId}
      />
    </div>
  );
}

export default App;
