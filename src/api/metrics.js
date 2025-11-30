export const fetchMetrics = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        users: Math.floor(Math.random() * 5000) + 1000,
        signups: Math.floor(Math.random() * 500) + 50,
        errors: Math.floor(Math.random() * 20),
        revenue: Math.floor(Math.random() * 50000)
    };
};