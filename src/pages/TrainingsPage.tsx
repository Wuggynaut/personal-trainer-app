import { useState } from "react";
import { TrainingDialog } from "../components/TrainingDialog";
import { Trainingslist } from "../components/Trainingslist";
import type { Customer, NewTraining, Training, TrainingExport } from "../types"
import { Button } from "@mui/material";
import { exportCSV } from "../utils/exportCSV";
import { CgExport } from "react-icons/cg";
import { FaPlusCircle } from "react-icons/fa";

type TrainingPageProps = {
    trainings: Training[];
    customers: Customer[];
    onAdd: (training: NewTraining) => void;
    onDelete: (id: string) => void;
};

export function TrainingsPage({ trainings, customers, onAdd, onDelete }: TrainingPageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleOpenAdd = () => {
        setIsDialogOpen(true);
    };

    const handleExport = () => {
        const exportTrainings: TrainingExport[] = trainings.map((training) => ({
            date: training.date.format('DD.MM.YYYY HH:mm'),
            duration: training.duration.toString(),
            activity: training.activity,
            customer: `${training.customer.lastname}, ${training.customer.firstname}`
        }));
        exportCSV(exportTrainings, 'trainings');
    };

    return (
        <>
            <div className="button-row">
                <Button
                    variant="contained"
                    onClick={handleOpenAdd}
                    style={{ margin: '10px 0' }} >
                    <FaPlusCircle className="button-icon" /> Add Training
                </Button>
                <Button
                    variant="contained"
                    onClick={handleExport}
                    style={{ margin: '10px 0' }} >
                    <CgExport className="button-icon" /> Export Trainings
                </Button>
            </div>
            <Trainingslist
                trainings={trainings}
                onDelete={onDelete} />
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
    );
};