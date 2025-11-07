import { Trainingslist } from "../components/TrainingsList";
import type { Training } from "../types"

type TrainingPageProps = {
    trainings: Training[];
}

export function TrainingsPage({ trainings }: TrainingPageProps) {
    return (
        <>
            <Trainingslist
                trainings={trainings} />
        </>
    )
}