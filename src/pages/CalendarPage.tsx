import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import type { Training } from "../types";
import './Calendar.css';

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
        <div className='calendar-container'>
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

                eventDisplay="block"
                dayMaxEvents={true}

                height="auto" // Makes calendar height responsive
                contentHeight="auto"
                aspectRatio={1.5} // Width-to-height ratio
                handleWindowResize={true} // Automatically responds to window resize
                windowResizeDelay={200} // Debounce time in ms
            />
        </div>
    )
}