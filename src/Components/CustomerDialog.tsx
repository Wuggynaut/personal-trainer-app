import React, { useEffect, useState } from "react";
import type { Customer } from "../types"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import './Dialog.css';

type CustomerDialogProps = {
    customer?: Customer | null;
    open: boolean;
    onClose: () => void;
    onSave: (customer: Omit<Customer, '_links' | 'id'> & { id?: string }) => void;
};

export function CustomerDialog({ customer, open, onClose, onSave }: CustomerDialogProps) {
    const isEditMode = customer !== null && customer !== undefined;

    const [formData, setFormData] = useState({
        firstname: customer?.firstname || '',
        lastname: customer?.lastname || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        streetaddress: customer?.streetaddress || '',
        postcode: customer?.postcode || '',
        city: customer?.city || ''
    });

    useEffect(() => {
        if (open && customer) {
            // Edit mode - populate with customer data
            setFormData({
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email,
                phone: customer.phone,
                streetaddress: customer.streetaddress,
                postcode: customer.postcode,
                city: customer.city
            });
        } else if (open && !customer) {
            // Add mode - reset to empty
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                streetaddress: '',
                postcode: '',
                city: ''
            });
        }
    }, [open, customer]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        const customerData = {
            ...(customer?.id && { id: customer.id }), // Only include id if editing
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            streetaddress: formData.streetaddress,
            postcode: formData.postcode,
            city: formData.city
        };
        onSave(customerData);
        handleClose();
    };

    const handleClose = () => {
        setFormData({
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
            <DialogTitle>{isEditMode ? 'Edit' : 'Add'} Customer</DialogTitle>
            <DialogContent className="dialog-content">
                <TextField
                    margin='dense'
                    name='lastname'
                    label='Last Name'
                    fullWidth
                    value={formData.lastname}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='firstname'
                    label='First Name'
                    fullWidth
                    value={formData.firstname}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='email'
                    label='Email'
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='phone'
                    label='Phone'
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='streetaddress'
                    label='Street Address'
                    fullWidth
                    value={formData.streetaddress}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='postcode'
                    label='Postcode'
                    fullWidth
                    value={formData.postcode}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='city'
                    label='City'
                    fullWidth
                    value={formData.city}
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