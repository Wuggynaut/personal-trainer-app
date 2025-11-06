import React, { useState } from "react";
import type { Customer } from "../types"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

type AddCustomerProps = {
    open: boolean;
    onClose: () => void;
    onSave: (customer: Omit<Customer, 'id' | '_links'>) => void;
};

export function AddCustomer({ open, onClose, onSave }: AddCustomerProps) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        const customerData = {
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            phone: customer.phone,
            streetaddress: customer.streetaddress,
            postcode: customer.postcode,
            city: customer.city
        };
        onSave(customerData);
        setCustomer({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: ''
        });
    };

    const handleClose = () => {
        setCustomer({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: ''
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    name='lastname'
                    label='Last Name'
                    fullWidth
                    value={customer.lastname}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='firstname'
                    label='First Name'
                    fullWidth
                    value={customer.firstname}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='email'
                    label='Email'
                    fullWidth
                    value={customer.email}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='phone'
                    label='Phone'
                    fullWidth
                    value={customer.phone}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='streetaddress'
                    label='Street Address'
                    fullWidth
                    value={customer.streetaddress}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='postcode'
                    label='Postcode'
                    fullWidth
                    value={customer.postcode}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='city'
                    label='City'
                    fullWidth
                    value={customer.city}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    )
}