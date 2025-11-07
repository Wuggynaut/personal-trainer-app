import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Training } from "../types"
import { Button } from "@mui/material";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

type TrainingslistProps = {
    trainings: Training[];
}

export function Trainingslist({ trainings }: TrainingslistProps) {

    const columns: GridColDef[] = [
        { field: 'customerName', headerName: 'Customer', width: 200 },
        {
            field: 'date', headerName: 'Date', width: 250,
            valueFormatter: (value: any) => value ? value.format('DD.MM.YYYY HH:mm') : ''
        },
        { field: 'duration', headerName: 'Duration', width: 150 },
        { field: 'activity', headerName: 'Activity', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: () => (
                <>
                    <Button size='small'>
                        <FaRegEdit />
                    </Button>
                    <Button size='small'>
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
                        sortModel: [{ field: 'customerName', sort: 'asc' }]
                    }
                }}
                style={{ height: 600 }}
            />
        </>
    )
}