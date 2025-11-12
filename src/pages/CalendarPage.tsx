import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import type { Training } from "../types";
import './TrainingCalendar.css';

type CalendarPageProps = {
    trainings: Training[];
}

export function CalendarPage({ trainings }: CalendarPageProps) {
    const events = trainings.map(training => ({
        title: `${training.activity} - ${training.customer.lastname}`,
        start: training.date.toISOString(),
        end: training.date.add(training.duration, 'minute').toISOString()
    }));

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }}
            eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }}
            displayEventTime={false}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            events={events}
            height="auto"
            eventDisplay="block"
            dayMaxEvents={true}
        />
    )
}