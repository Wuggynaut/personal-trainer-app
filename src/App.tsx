
import { useEffect, useState } from 'react'
import './App.css'
import type { Training, Customer, NewTraining, TrainingResponse, CustomerResponse } from './types'
import { AppBar, Box, Button, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import dayjs from 'dayjs';
import { CustomerPage } from './pages/CustomerPage';
import { HomePage } from './pages/HomePage';
import { TrainingsPage } from './pages/TrainingsPage';
import toast, { Toaster } from 'react-hot-toast';
import { CalendarPage } from './pages/CalendarPage';
import { StatsPage } from './pages/StatsPage';
import { CgMenu } from 'react-icons/cg';

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
      const data: CustomerResponse = await response.json();

      const customersWithId = data._embedded.customers.map((customer) => ({
        ...customer, id: customer._links.self.href.split('/').pop() as string
      }));

      setCustomers(customersWithId);
      return customersWithId;
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    );

    if (!confirmed) {
      return;
    }
    const loadingToast = toast.loading('Deleting customer...');

    try {
      const response = await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        toast.error('Error deleting customer', {
          id: loadingToast
        });
        throw new Error('Delete failed');
      }
      toast.success('Customer deleted successfully!', {
        id: loadingToast
      });
      fetchCustomers();
      fetchTrainings();
    } catch (error) {
      toast.error('Network error. Please try again.', {
        id: loadingToast
      });
      console.error('Error:', error);
    }
  };

  const handleUpdateCustomer = async (customer: Omit<Customer, '_links'>) => {
    const loadingToast = toast.loading('Updating customer...');

    try {
      const response = await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });
      if (!response.ok) {
        toast.error('Error updating customer', {
          id: loadingToast
        });
        throw new Error('Update failed');
      }
      toast.success('Customer updated successfully!', {
        id: loadingToast
      });
      fetchCustomers();
    } catch (error) {
      toast.error('Network error. Please try again.', {
        id: loadingToast
      });
      console.error('Error:', error);
    }
  };

  const handleAddCustomer = async (customer: Omit<Customer, 'id' | '_links'>) => {
    const loadingToast = toast.loading('Adding customer...');
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });

      if (!response.ok) {
        toast.error('Error adding customer', {
          id: loadingToast
        });
        throw new Error('Add failed');
      }
      toast.success('Customer added successfully!', {
        id: loadingToast
      });
      fetchCustomers();
    } catch (error) {
      toast.error('Network error. Please try again.', {
        id: loadingToast
      });
      console.error('Error:', error);
    }
  };

  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
      const data: TrainingResponse[] = await response.json();

      const trainingsWithDates = data.map((training) => ({
        ...training,
        date: dayjs(training.date),
      }));

      setTrainings(trainingsWithDates);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  const handleAddTraining = async (training: NewTraining) => {
    const loadingToast = toast.loading('Adding training...');

    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
      })
      if (!response.ok) {
        toast.error('Error adding customer', {
          id: loadingToast
        });
        throw new Error('Add failed');
      }
      toast.success('Training added successfully!', {
        id: loadingToast
      });

      fetchTrainings();

    } catch (error) {
      toast.error('Network error. Please try again.', {
        id: loadingToast
      });
      console.error('Error:', error);
    }
  };

  const handleDeleteTraining = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this training?'
    );

    if (!confirmed) {
      return;
    }
    const loadingToast = toast.loading('Deleting training...');

    try {
      const response = await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        toast.error('Error deleting training', {
          id: loadingToast
        });
        throw new Error('Delete failed');
      }
      toast.success('Training deleted successfully!', {
        id: loadingToast
      });
      fetchTrainings();
    } catch (error) {
      toast.error('Network error. Please try again.', {
        id: loadingToast
      });
      console.error('Error:', error);
    }
  }

  const handleResetDatabase = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset the database?'
    );

    if (!confirmed) {
      return;
    }

    const loadingToast = toast.loading('Resetting database...');

    try {
      const response = await fetch(
        'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset',
        {
          method: 'POST'
        }
      );

      if (!response.ok) {
        toast.error('Error resetting customer', {
          id: loadingToast
        });
        throw new Error('Reset failed');
      }

      const message = await response.text();
      console.log(message);

      toast.success('Database reset successfully!', {
        id: loadingToast
      });

      fetchCustomers();
      fetchTrainings();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error resetting database', {
        id: loadingToast
      });
    }
  };

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  // Navigation items array for easier management
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Customers', path: '/customers' },
    { label: 'Trainings', path: '/trainings' },
    { label: 'Training Calendar', path: '/calendar' },
    { label: 'Stats', path: '/stats' },
  ];

  return (
    <>
      <CssBaseline />
      <HashRouter>
        <AppBar position='static' sx={{ marginBottom: '10px' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Training App
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleMenuOpen}
                >
                  <CgMenu />
                </IconButton>

                <Menu
                  anchorEl={anchorElement}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElement)}
                  onClose={handleMenuClose}
                >
                  {navItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      component={Link}
                      to={item.path}
                      onClick={handleMenuClose}
                    >
                      {item.label}
                    </MenuItem>
                  ))}

                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleResetDatabase();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    Reset Database
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={Link}
                    to={item.path}
                  >
                    {item.label}
                  </Button>
                ))}

                <Button
                  onClick={handleResetDatabase}
                  variant="contained"
                  color="error"
                >
                  Reset Database
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>


        <Toaster position="top-right" />
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
                onUpdate={handleUpdateCustomer}
                onAdd={handleAddCustomer}
              />}
          />
          <Route
            path='/trainings'
            element={
              <TrainingsPage
                trainings={trainings}
                customers={customers}
                onAdd={handleAddTraining}
                onDelete={handleDeleteTraining}
              />}
          />
          <Route
            path='/calendar'
            element={
              <CalendarPage
                trainings={trainings}
              />}
          />
          <Route
            path='/stats'
            element={
              <StatsPage
                trainings={trainings}
              />}
          />
        </Routes>
      </HashRouter>

    </>

  )
}

export default App
