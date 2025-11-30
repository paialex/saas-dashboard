import { createContext, useContext } from 'react'; // No more useState/useEffect/useRef imports needed here!
import { useMockData } from '../hooks/useMockData';

const DashboardContext = createContext();

// Define the data generation logic separately
const generateMetrics = () => ({
    users: Math.floor(Math.random() * 100),
    signups: Math.floor(Math.random() * 50),
    errors: Math.floor(Math.random() * 10)
});

export function DashboardProvider({ children }) {
    // ONE LINE to handle all logic:
    const { data: metrics, loading, refetch } = useMockData(generateMetrics);

    const updateMetric = (metricKey) => {
        // (This logic stays the same, but we need to handle if metrics is null)
        // In a real app, this might be a POST request hook.
        // For now, we can't easily update 'data' coming from the hook unless
        // we return a 'setData' function from the hook too.
        // Let's keep it simple for now and focus on the fetch.
    };

    return (
        // We map 'refetch' to 'refreshData' to match what TopBar expects
        <DashboardContext.Provider value={{ metrics, loading, refreshData: refetch }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    return useContext(DashboardContext);
}