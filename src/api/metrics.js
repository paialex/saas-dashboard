// This is a pure Javascript function. No React logic here.
export const fetchMetrics = async () => {
    console.log("📡 Fetching fresh data from API...");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random data
    return {
        users: Math.floor(Math.random() * 5000) + 1000,
        signups: Math.floor(Math.random() * 500) + 50,
        errors: Math.floor(Math.random() * 20),
        revenue: Math.floor(Math.random() * 50000)
    };
};