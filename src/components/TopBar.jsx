import { useQueryClient } from '@tanstack/react-query';

export default function TopBar() {
    const queryClient = useQueryClient();

    const handleRefresh = () => {
        // Tell React Query: "Mark 'metrics' as invalid and fetch it again immediately"
        queryClient.invalidateQueries({ queryKey: ['metrics'] });
    };

    return (
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-700">Overview</h2>

            <button
                onClick={handleRefresh}
                className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-all active:scale-95"
            >
                🔄 Refresh
            </button>
        </header>
    );
}