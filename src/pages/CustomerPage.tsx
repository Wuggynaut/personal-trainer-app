import { Button } from "@mui/material";
import type { Customer, CustomerExport } from "../types";
import { CustomerDialog } from "../components/CustomerDialog";
import { Customerlist } from "../components/Customerlist";
import { useState } from "react";
import { exportCSV } from "../utils/exportCSV";
import { CgExport } from "react-icons/cg";
import { FaPlusCircle } from "react-icons/fa";

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

    const handleExport = () => {
        const customerExport: CustomerExport[] = customers.map(({ id, _links, ...rest }) => rest)
        exportCSV(customerExport, 'customers');
    }

    return (
        <>
            <div className="button-row">
                <Button
                    variant="contained"
                    onClick={handleOpenAdd}
                    style={{ margin: '10px 0' }}>
                    <FaPlusCircle className="button-icon" /> Add Customer
                </Button>
                <Button
                    variant="contained"
                    onClick={handleExport}
                    style={{ margin: '10px 0' }}>
                    <CgExport className="button-icon" /> Export Customers
                </Button>
            </div>
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