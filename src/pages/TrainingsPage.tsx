import { useState } from "react";
import { TrainingDialog } from "../components/TrainingDialog";
import { Trainingslist } from "../components/Trainingslist";
import type { Customer, NewTraining, Training } from "../types"
import { Button } from "@mui/material";

type TrainingPageProps = {
    trainings: Training[];
    customers: Customer[];
    onAdd: (training: NewTraining) => void;
}

export function TrainingsPage({ trainings, customers, onAdd }: TrainingPageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    }

    const handleOpenAdd = () => {
        setIsDialogOpen(true);
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpenAdd}
                style={{ margin: '10px 0' }}
            >
                Add Training
            </Button>
            <Trainingslist
                trainings={trainings} />
            <TrainingDialog
                customers={customers}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSave={(training) => {
                    onAdd(training);
                    handleCloseDialog();
                }}
            />
        </>
    )
}