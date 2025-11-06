
import { useEffect, useState } from 'react'
import './App.css'
import { type Customer } from './types'
import { CssBaseline } from '@mui/material';
import { Customerlist } from './Components/CustomerList';
import { EditCustomer } from './Components/EditCustomer';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => {
        const customersWithId = data._embedded.customers.map((customer: any) => ({
          id: customer._links.self.href.split('/').pop() as string, ...customer
        }));
        setCustomers(customersWithId);
      })
      .catch(error => console.error('Error fetching customers:', error))
  };

  const handleDeleteCustomer = (id: string) => {
    fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
        } else {
          alert('Error deleting customer');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleUpdate = (customer: Omit<Customer, '_links'>) => {
    fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
          setEditCustomer(null);
        } else {
          alert('Error updating customer')
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditCustomer(customer);
  };

  return (
    <>
      <CssBaseline />
      <Customerlist
        customers={customers}
        onDelete={handleDeleteCustomer}
        onEdit={handleEditCustomer} />
      <EditCustomer
        customer={editCustomer}
        open={editCustomer !== null}
        onClose={() => setEditCustomer(null)}
        onSave={handleUpdate}
      />
    </>

  )
}

export default App
