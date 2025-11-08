import { useState } from "react";
import type { Customer, NewTraining } from "../types"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, MenuItem, OutlinedInput, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import './Dialog.css';

type TrainingDialogProps = {
    customers: Customer[];
    open: boolean;
    onClose: () => void;
    onSave: (training: NewTraining) => void;
}

export function TrainingDialog({ customers, open, onClose, onSave }: TrainingDialogProps) {

    const [formData, setFormData] = useState({
        date: dayjs(),
        duration: 0,
        activity: '',
        customerId: ''
    });

    const handleSubmit = () => {
        const trainingData = {
            date: formData.date.toISOString(),
            duration: formData.duration.toString(),
            activity: formData.activity,
            customer: `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${formData.customerId}`
        };
        onSave(trainingData);
        handleClose();
    };

    const handleClose = () => {
        setFormData({
            date: dayjs(),
            duration: 0,
            activity: '',
            customerId: ''
        });
        onClose();
    }

    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue) {
            setFormData({ ...formData, date: newValue })
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Training</DialogTitle>
            <DialogContent className="dialog-content">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={formData.date}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                <OutlinedInput
                    label="Duration"
                    endAdornment={<InputAdornment position='end'>min</InputAdornment>}
                    value={formData.duration}
                    onChange={(event) => setFormData({
                        ...formData,
                        duration: Number(event.target.value)
                    })}
                />
                <TextField
                    label="Activity"
                    variant="outlined"
                    value={formData.activity}
                    onChange={(event) => setFormData({ ...formData, activity: event.target.value })}
                />
                <TextField select
                    label="Customer"
                    value={formData.customerId}
                    onChange={(event) => setFormData({ ...formData, customerId: event.target.value })}>
                    {customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                            {`${customer.lastname}, ${customer.firstname}`}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    )
}