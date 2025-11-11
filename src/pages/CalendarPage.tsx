
import { TrainingCalendar } from "../components/TrainingCalendar";
import type { Training } from "../types";

type CalendarPageProps = {
    trainings: Training[];
}

export function CalendarPage({ trainings }: CalendarPageProps) {
    return (
        <TrainingCalendar
            trainings={trainings}
        />
    )
}