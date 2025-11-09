import { useState } from "react";
import type { Customer, NewTraining } from "../types"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, MenuItem, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
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
                    <DateTimePicker
                        name='date'
                        label="Date and Time"
                        value={formData.date}
                        onChange={handleDateChange}
                        format="DD.MM.YYYY HH:mm"
                        ampm={false}
                        viewRenderers={{
                            hours: null,
                            minutes: null,
                            seconds: null,
                        }}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: 'dense'
                            }
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    margin='dense'
                    name='duration'
                    label="Duration"
                    variant="outlined"
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position='end'>min</InputAdornment>
                        }
                    }}
                    value={formData.duration}
                    onChange={(event) => setFormData({
                        ...formData,
                        duration: Number(event.target.value)
                    })}
                />
                <TextField
                    margin='dense'
                    name='activity'
                    label="Activity"
                    variant="outlined"
                    value={formData.activity}
                    onChange={(event) => setFormData({ ...formData, activity: event.target.value })}
                />
                <TextField select
                    margin='dense'
                    name='customer'
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