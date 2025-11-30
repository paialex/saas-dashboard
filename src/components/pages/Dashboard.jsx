import { useReducer, useState, useCallback } from 'react';
import { dashboardReducer, initialFilterState } from '../../reducers/dashboardReducer';
import { useQuery } from '@tanstack/react-query';
import Modal from '../../components/Modal';
import MetricCard from './MetricCard';
import HeavyButton from '../../components/HeavyButton';
import { fetchMetrics } from '../../api/metrics';

// Helper Component: Throws an error when rendered
function BuggyComponent() {
    throw new Error("I crashed during render!");
}

export default function Dashboard() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [shouldCrash, setShouldCrash] = useState(false);

    // dispatch is the "messenger" function
    const [state, dispatch] = useReducer(dashboardReducer, initialFilterState);

    // Derived state (Simulated filtering logic)
    // In a real app, you would pass 'state' to your useQuery or API
    // ❌ BAD: This function is recreated every time Dashboard renders
    const handleBadClick = () => console.log("Bad Click");

    // ✅ GOOD: This function reference is cached forever (dependency array is empty)
    const handleGoodClick = useCallback(() => {
        console.log("Good Click");
    }, []);

    console.log("Current Filters:", state);

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


    if (shouldCrash) {
        // This happens during RENDER, so the ErrorBoundary WILL catch it.
        return <BuggyComponent />;
    }



    return (
        <div className="space-y-6">

            <div>
                <div className="p-4 bg-yellow-50 mb-4 border border-yellow-200 rounded">
                    <p>Re-renders: {count}</p>
                    <button onClick={() => setCount(c => c + 1)} className="bg-yellow-200 px-2 rounded">
                        Force Parent Render
                    </button>
                </div>

                <div className="flex gap-4">
                    {/* This will log "Rendering..." every time you click "Force Parent Render" */}
                    <HeavyButton label="Broken Memo" onClick={handleBadClick} />

                    {/* This will log ONCE on mount, and never again. */}
                    <HeavyButton label="Working Memo" onClick={handleGoodClick} />
                </div>
            </div>

            {/* Button to test portal */}
            <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Open Settings Modal
            </button>

            <button
                onClick={() => setShouldCrash(true)}
                className="bg-red-800 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-900 transition-colors"
            >
                💣 Simulate Crash (For Real)
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Quick Settings"
            >
                <p className="text-slate-600">
                    This modal is rendered in document.body, so it floats above the Sidebar
                    and isn't clipped by the overflow:hidden layout!
                </p>
                <div className="mt-6 flex justify-end">
                    <button onClick={() => setModalOpen(false)} className="text-blue-600 font-medium">Done</button>
                </div>
            </Modal>


            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>

            {/* THE FILTER BAR */}
            <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 items-center">

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search metrics..."
                    value={state.searchQuery}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm w-64"
                />

                {/* Status Dropdown */}
                <select
                    value={state.statusFilter}
                    onChange={(e) => dispatch({ type: 'SET_STATUS', payload: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm bg-white"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive (Auto-sorts Oldest)</option>
                </select>

                {/* Reset Button (Only shows if dirty) */}
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
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* We pass the specific value down */}
                    <MetricCard title="Active Users" value={metrics.users} />
                    <MetricCard title="Pending Signups" value={metrics.signups} />
                    <MetricCard title="Server Errors" value={metrics.errors} />
                </div>
            </div>
        </div>
    );
}