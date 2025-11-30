import { useReducer, useMemo } from 'react';
import { dashboardReducer, initialFilterState } from '../../reducers/dashboardReducer';
import { useQuery } from '@tanstack/react-query';
import MetricCard from './MetricCard';
import { fetchUsers } from '../../api/users';

export default function Dashboard() {
    const [state, dispatch] = useReducer(dashboardReducer, initialFilterState);

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Extract unique cities for the dropdown
    const cities = useMemo(() => {
        const allCities = users.map(u => u.address.city);
        return [...new Set(allCities)].sort();
    }, [users]);

    // Filter Logic
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesName = user.name.toLowerCase().includes(state.nameFilter.toLowerCase());
            const matchesEmail = user.email.toLowerCase().includes(state.emailFilter.toLowerCase());
            const matchesCompany = user.company.name.toLowerCase().includes(state.companyFilter.toLowerCase());
            const matchesCity = state.cityFilter ? user.address.city === state.cityFilter : true;

            return matchesName && matchesEmail && matchesCompany && matchesCity;
        });
    }, [users, state]);

    // Calculate Metrics based on real data
    const metrics = {
        totalUsers: users.length,
        filteredCount: filteredUsers.length,
        uniqueCompanies: new Set(users.map(u => u.company.name)).size
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="animate-spin text-4xl">⏳</div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Failed to load users.</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">User Management</h1>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <MetricCard title="Total Users" value={metrics.totalUsers} />
                <MetricCard title="Showing Users" value={metrics.filteredCount} />
                <MetricCard title="Unique Companies" value={metrics.uniqueCompanies} />
            </div>

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Filter by Name..."
                    value={state.nameFilter}
                    onChange={(e) => dispatch({ type: 'SET_NAME_FILTER', payload: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm w-full"
                />
                <input
                    type="text"
                    placeholder="Filter by Email..."
                    value={state.emailFilter}
                    onChange={(e) => dispatch({ type: 'SET_EMAIL_FILTER', payload: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm w-full"
                />
                <input
                    type="text"
                    placeholder="Filter by Company..."
                    value={state.companyFilter}
                    onChange={(e) => dispatch({ type: 'SET_COMPANY_FILTER', payload: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm w-full"
                />
                <select
                    value={state.cityFilter}
                    onChange={(e) => dispatch({ type: 'SET_CITY_FILTER', payload: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm bg-white w-full"
                >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {state.isDirty && (
                <div className="flex justify-end">
                     <button
                        onClick={() => dispatch({ type: 'RESET' })}
                        className="text-sm text-red-600 hover:underline font-medium"
                    >
                        Clear All Filters ✕
                    </button>
                </div>
            )}

            {/* Users Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <table className="min-w-full bg-white text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Company</th>
                            <th className="px-6 py-4">City</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                                    <td className="px-6 py-4 text-blue-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <div>{user.company.name}</div>
                                        <div className="text-xs text-slate-400 italic">{user.company.catchPhrase}</div>
                                    </td>
                                    <td className="px-6 py-4">{user.address.city}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                                    No users found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}