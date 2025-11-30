import { useReducer } from 'react';
import { dashboardReducer, initialFilterState } from '../../reducers/dashboardReducer';
import { useQuery } from '@tanstack/react-query';
import MetricCard from './MetricCard';
import { fetchMetrics } from '../../api/metrics';

export default function Dashboard() {
    const [state, dispatch] = useReducer(dashboardReducer, initialFilterState);

    const { data: metrics, isLoading, isError } = useQuery({
        queryKey: ['metrics'],
        queryFn: fetchMetrics,
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

            <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 items-center">

                <input
                    type="text"
                    placeholder="Search metrics..."
                    value={state.searchQuery}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm w-64"
                />

                <select
                    value={state.statusFilter}
                    onChange={(e) => dispatch({ type: 'SET_STATUS', payload: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm bg-white"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive (Auto-sorts Oldest)</option>
                </select>

                {state.isDirty && (
                    <button
                        onClick={() => dispatch({ type: 'RESET' })}
                        className="text-sm text-red-600 hover:underline ml-auto font-medium"
                    >
                        Clear Filters ✕
                    </button>
                )}
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <MetricCard title="Active Users" value={metrics.users} />
                    <MetricCard title="Pending Signups" value={metrics.signups} />
                    <MetricCard title="Server Errors" value={metrics.errors} />
                </div>
            </div>
        </div>
    );
}