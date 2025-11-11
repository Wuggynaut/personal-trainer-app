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
            field: 'customer', headerName: 'Customer', width: 200,
            valueFormatter: (value: any) => value ? `${value.lastname}, ${value.firstname}` : 'Unknown'
        },
        {
            field: 'date', headerName: 'Date', width: 250,
            valueFormatter: (value: any) => value ? value.format('DD.MM.YYYY HH:mm') : ''
        },
        { field: 'duration', headerName: 'Duration (min)', width: 150 },
        { field: 'activity', headerName: 'Activity', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
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
        <>
            <DataGrid
                rows={trainings}
                columns={columns}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'customer', sort: 'asc' }]
                    }
                }}
                style={{ height: 600 }}
            />
        </>
    )
}