import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Training, TrainingData } from '../types';

type StatsPageProps = {
    trainings: Training[];
}

export function StatsPage({ trainings }: StatsPageProps) {
    const data = trainings.map(training => ({
        activity: training.activity,
        duration: training.duration
    }) as TrainingData);

    const collatedData = data.reduce((acc, curr) => {
        const existing = acc.find(item => item.activity === curr.activity);

        if (existing) {
            existing.duration += curr.duration;
        } else {
            acc.push({ activity: curr.activity, duration: curr.duration });
        }

        return acc;
    }, [] as TrainingData[]);

    return (
        <div className="stats-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={collatedData}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="activity" />
                    <YAxis width="auto" label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill="#1565c0" isAnimationActive={false} />
                </BarChart>
            </ResponsiveContainer>
        </div>

    )
}