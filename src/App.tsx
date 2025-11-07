
import { useEffect, useState } from 'react'
import './App.css'
import { type Customer } from './types'
import { Button, CssBaseline } from '@mui/material';
import { Customerlist } from './Components/Customerlist';
import { CustomerDialog } from './Components/CustomerDialog';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogCustomer, setDialogCustomer] = useState<Customer | null>(null);

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
        } else {
          alert('Error updating customer')
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleAdd = (customer: Omit<Customer, 'id' | '_links'>) => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
        } else {
          alert('Error adding customer');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleEditCustomer = (customer: Customer) => {
    setDialogCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogCustomer(null);
    setIsDialogOpen(false);
  }

  const handleOpenAdd = () => {
    setDialogCustomer(null);
    setIsDialogOpen(true);
  }

  return (
    <>
      <CssBaseline />
      <Button
        variant="contained"
        onClick={handleOpenAdd}
        style={{ margin: '10px 0' }}
      >
        Add Customer
      </Button>
      <Customerlist
        customers={customers}
        onDelete={handleDeleteCustomer}
        onEdit={handleEditCustomer} />

      <CustomerDialog
        customer={dialogCustomer}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={(customer) => {
          if (dialogCustomer) {
            handleUpdate(customer as Omit<Customer, '_links'>);
          } else {
            handleAdd(customer as Omit<Customer, 'id' | '_links'>);
          }
          handleCloseDialog();
        }}
      />
    </>

  )
}

export default App
