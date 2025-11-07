
import { useEffect, useState } from 'react'
import './App.css'
import { type Training, type Customer, type TrainingResponse } from './types'
import { CssBaseline } from '@mui/material';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import dayjs from 'dayjs';
import { CustomerPage } from './pages/CustomerPage';
import { HomePage } from './pages/HomePage';
import { TrainingsPage } from './pages/TrainingsPage';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    fetchCustomers()
      .then(() => fetchTrainings());
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
      const data = await response.json();

      const customersWithId = data._embedded.customers.map((customer: any) => ({
        ...customer, id: customer._links.self.href.split('/').pop() as string
      }));

      setCustomers(customersWithId);
      return customersWithId;
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  };

  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
      const data = await response.json();

      const trainingsWithCustomers = await Promise.all(
        data._embedded.trainings.map(async (training: TrainingResponse) => {
          try {
            const customerResponse = await fetch(training._links.customer.href);
            const customerData = await customerResponse.json();

            return {
              ...training,
              id: training._links.self.href.split('/').pop() as string,
              date: dayjs(training.date),
              customerName: customerData ? `${customerData.lastname}, ${customerData.firstname}` : 'Unknown'
            };
          } catch (error) {
            console.error('Error fetching customer for training:', error);
            return {
              ...training,
              id: training._links.self.href.split('/').pop() as string,
              date: dayjs(training.date),
              customerName: 'Unknown'
            };
          }
        })
      );

      setTrainings(trainingsWithCustomers);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
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

  return (
    <>
      <CssBaseline />
      <HashRouter>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/customers'>Customers</Link>
          <Link to='/trainings'>Trainings</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path='/customers'
            element={
              <CustomerPage
                customers={customers}
                onDelete={handleDeleteCustomer}
                onUpdate={handleUpdate}
                onAdd={handleAdd}
              />}
          />
          <Route
            path='/trainings'
            element={
              <TrainingsPage
                trainings={trainings}
              />}
          />

        </Routes>
      </HashRouter>

    </>

  )
}

export default App
