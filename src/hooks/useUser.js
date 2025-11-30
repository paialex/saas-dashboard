import { useQuery } from '@tanstack/react-query';

// Mock API function (in a real app, import this from api/user.js)
const fetchUser = async () => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return the user object
    // In a real app, this fetches from your database
    // We use localStorage here just so you can see the persistence across reloads
    const storedName = localStorage.getItem('user_name') || 'Alex Developer';

    return {
        id: 1,
        fullName: storedName,
        email: 'alex@example.com',
        role: 'Admin'
    };
};

export function useUser() {
    return useQuery({
        queryKey: ['user-profile'], // <--- THE GOLDEN KEY
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 5, // Data is "fresh" for 5 minutes
    });
}