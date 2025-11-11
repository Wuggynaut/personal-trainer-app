import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Customer } from "../types"
import { Button } from "@mui/material";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

type CustomerlistProps = {
    customers: Customer[];
    onDelete: (id: string) => void;
    onEdit: (customer: Customer) => void;
}

export function Customerlist({ customers, onDelete, onEdit }: CustomerlistProps) {

    const columns: GridColDef[] = [
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'streetaddress', headerName: 'Street Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 125 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Button size='small' onClick={() => onEdit(params.row)}>
                        <FaRegEdit />
                    </Button>
                    <Button size='small' onClick={() => onDelete(params.row.id)}>
                        <FaRegTrashAlt color='red' />
                    </Button>
                </>
            )
        }

    ];

    return (
        <DataGrid
            rows={customers}
            columns={columns}
            initialState={{
                sorting: {
                    sortModel: [{ field: 'lastname', sort: 'asc' }]
                },
            }}
        />
    );

}