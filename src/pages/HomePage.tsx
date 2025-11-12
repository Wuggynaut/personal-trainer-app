export function HomePage() {
    return (
        <div className="home-container">
            <h1>Training App</h1>
            <p>Manage your customers and their training sessions all in one place.</p>
            <div style={{ marginTop: '30px' }}>
                <h2>Quick Start</h2>
                <ul>
                    <li>Go to <strong>Customers</strong> to add or manage your customers</li>
                    <li>Go to <strong>Trainings</strong> to schedule and track training sessions</li>
                    <li>Go to <strong>Training Calendar</strong> to view scheduled trainings in a calendar view.</li>
                    <li>Go to <strong>Stats</strong> to see how much of each training types are scheduled in a chart</li>
                    <li>Use the <strong>Reset Database</strong> button to start fresh (this button is for demo purposes only)</li>
                </ul>
            </div>
        </div>
    );
}