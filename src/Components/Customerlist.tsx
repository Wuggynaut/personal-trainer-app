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
        { field: 'lastname', headerName: 'Last Name', flex: 2, minWidth: 150, cellClassName: 'wrap-cell' },
        { field: 'firstname', headerName: 'First Name', flex: 2, minWidth: 100, cellClassName: 'wrap-cell' },
        { field: 'email', headerName: 'Email', flex: 3, minWidth: 175, cellClassName: 'wrap-cell' },
        { field: 'phone', headerName: 'Phone', flex: 2, minWidth: 150, cellClassName: 'wrap-cell' },
        { field: 'streetaddress', headerName: 'Street Address', flex: 2, minWidth: 150, cellClassName: 'wrap-cell' },
        { field: 'postcode', headerName: 'Postcode', flex: 1, minWidth: 100, cellClassName: 'wrap-cell' },
        { field: 'city', headerName: 'City', flex: 1, minWidth: 100, cellClassName: 'wrap-cell' },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2.5,
            cellClassName: 'wrap-cell',
            minWidth: 150,
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
        <div className="datagrid-container wide">
            <DataGrid
                rows={customers}
                columns={columns}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'lastname', sort: 'asc' }]
                    },
                }}
                getRowHeight={() => 'auto'}
            />
        </div>
    );

}