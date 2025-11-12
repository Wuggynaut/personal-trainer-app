import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Training } from "../types"
import { Button } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";

type TrainingslistProps = {
    trainings: Training[];
    onDelete: (id: string) => void;
}

export function Trainingslist({ trainings, onDelete }: TrainingslistProps) {

    const columns: GridColDef[] = [
        {
            field: 'customer', headerName: 'Customer', flex: 3, minWidth: 150, cellClassName: 'wrap-cell',
            valueFormatter: (value: any) => value ? `${value.lastname}, ${value.firstname}` : 'Unknown'
        },
        {
            field: 'date', headerName: 'Date', flex: 3, minWidth: 150, cellClassName: 'wrap-cell',
            valueFormatter: (value: any) => value ? value.format('DD.MM.YYYY HH:mm') : ''
        },
        { field: 'duration', headerName: 'Duration (min)', flex: 2, minWidth: 150, cellClassName: 'wrap-cell' },
        { field: 'activity', headerName: 'Activity', flex: 2, minWidth: 150, cellClassName: 'wrap-cell' },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 100,
            cellClassName: 'wrap-cell',
            sortable: false,
            renderCell: (params) => (
                <>
                    <Button size='small' onClick={() => onDelete(params.row.id)}>
                        <FaRegTrashAlt color='red' />
                    </Button>
                </>
            )
        }
    ]

    return (
        <div className="datagrid-container" >
            <DataGrid
                rows={trainings}
                columns={columns}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'customer', sort: 'asc' }]
                    }
                }}
                getRowHeight={() => 'auto'}
            />
        </div>
    )
}