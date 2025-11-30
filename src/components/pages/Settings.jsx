import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../hooks/useUser'; // Import the read hook to pre-fill form

export default function Settings() {
    const queryClient = useQueryClient();

    // 1. Prefill form with current server data
    const { data: user } = useUser();

    const [name, setName] = useState(user?.fullName || '');

    // 2. The Mutation
    const mutation = useMutation({
        mutationFn: async (newName) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // "Save" to database (simulated)
            localStorage.setItem('user_name', newName);
            return newName;
        },
        onSuccess: () => {
            console.log("✅ Mutation Successful. Invalidating cache...");

            // 3. THE TRIGGER
            // This tells React Query: "Go refresh the Sidebar immediately!"
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(name);
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Global Settings</h2>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-sm font-medium">Display Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    <button
                        disabled={mutation.isPending}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                    >
                        {mutation.isPending ? 'Saving...' : 'Update Name'}
                    </button>
                </form>
            </div>

            <div className="text-sm text-slate-500">
                <p>Tip: Watch the Sidebar name on the left when you click Update.</p>
            </div>
        </div>
    );
}