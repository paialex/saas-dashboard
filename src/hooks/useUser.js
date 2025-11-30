import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

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
        queryKey: ['user-profile'],
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 5,
    });
}