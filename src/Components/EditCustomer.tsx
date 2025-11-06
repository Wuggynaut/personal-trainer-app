import React, { useEffect, useState } from "react";
import type { Customer } from "../types"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

type EditCustomerProps = {
    customer: Customer | null;
    open: boolean;
    onClose: () => void;
    onSave: (customer: Omit<Customer, '_links'>) => void;
};

export function EditCustomer({ customer, open, onClose, onSave }: EditCustomerProps) {
    const [editedCustomer, setEditedCustomer] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    useEffect(() => {
        if (customer) {
            setEditedCustomer({
                id: customer.id,
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email,
                phone: customer.phone,
                streetaddress: customer.streetaddress,
                postcode: customer.postcode,
                city: customer.city
            })
        }
    }), [customer];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCustomer({ ...editedCustomer, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        const customerData = {
            id: editedCustomer.id,
            firstname: editedCustomer.firstname,
            lastname: editedCustomer.lastname,
            email: editedCustomer.email,
            phone: editedCustomer.phone,
            streetaddress: editedCustomer.streetaddress,
            postcode: editedCustomer.postcode,
            city: editedCustomer.city
        };
        onSave(customerData);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    name='lastname'
                    label='Last Name'
                    fullWidth
                    value={editedCustomer.lastname}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='firstname'
                    label='First Name'
                    fullWidth
                    value={editedCustomer.firstname}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='email'
                    label='Email'
                    fullWidth
                    value={editedCustomer.email}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='phone'
                    label='Phone'
                    fullWidth
                    value={editedCustomer.phone}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='streetaddress'
                    label='Street Address'
                    fullWidth
                    value={editedCustomer.streetaddress}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='postcode'
                    label='Postcode'
                    fullWidth
                    value={editedCustomer.postcode}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='city'
                    label='City'
                    fullWidth
                    value={editedCustomer.city}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    )
}