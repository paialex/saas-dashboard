import { useQuery } from '@tanstack/react-query'; // The Magic Hook
import MetricCard from './MetricCard';
import { fetchMetrics } from '../../api/metrics';

export default function Dashboard() {
    // useQuery requires 2 things:
    // 1. queryKey: A unique ID for this data ['metrics']
    // 2. queryFn: The function that returns the promise
    const { data: metrics, isLoading, isError } = useQuery({
        queryKey: ['metrics'],
        queryFn: fetchMetrics,
        // Optional: Keep data fresh for 5 seconds, then mark as stale
        staleTime: 5000,
    });

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="animate-spin text-4xl">⏳</div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Failed to load data.</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* We pass the specific value down */}
                <MetricCard title="Active Users" value={metrics.users} />
                <MetricCard title="Pending Signups" value={metrics.signups} />
                <MetricCard title="Server Errors" value={metrics.errors} />
            </div>
        </div>
    );
}