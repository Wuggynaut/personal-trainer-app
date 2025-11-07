import { Button } from "@mui/material";
import type { Customer } from "../types";
import { CustomerDialog } from "../components/CustomerDialog";
import { Customerlist } from "../components/Customerlist";
import { useState } from "react";

type CustomerPageProps = {
    customers: Customer[];
    onDelete: (id: string) => void;
    onUpdate: (customer: Omit<Customer, '_links'>) => void;
    onAdd: (customer: Omit<Customer, 'id' | '_links'>) => void;
}

export function CustomerPage({ customers, onDelete, onUpdate, onAdd }: CustomerPageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogCustomer, setDialogCustomer] = useState<Customer | null>(null);


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
            <Button
                variant="contained"
                onClick={handleOpenAdd}
                style={{ margin: '10px 0' }}
            >
                Add Customer
            </Button>
            <Customerlist
                customers={customers}
                onDelete={onDelete}
                onEdit={handleEditCustomer}
            />
            <CustomerDialog
                customer={dialogCustomer}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSave={(customer) => {
                    if (dialogCustomer) {
                        // Edit mode - customer has id, assert it as required type
                        onUpdate(customer as Omit<Customer, '_links'>);
                    } else {
                        // Add mode - remove id if it exists
                        const { id, ...customerWithoutId } = customer;
                        onAdd(customerWithoutId);
                    }
                    handleCloseDialog();
                }}
            />
        </>
    )
}