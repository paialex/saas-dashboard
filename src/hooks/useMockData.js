import { useState, useEffect, useRef, useCallback } from 'react';

// This hook handles the lifecycle of "fetching"
export function useMockData(dataGenerator, delay = 2000) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // The Ref is now hidden inside this hook. 
    // The component using this hook doesn't need to know about timers!
    const timerRef = useRef(null);

    // We wrap this in useCallback so the function reference stays stable
    // (This prevents infinite loops if you add it to dependency arrays later)
    const fetchData = useCallback(() => {
        // 1. Cleanup old timer if exists (Safety)
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // 2. Reset UI state
        setLoading(true);

        // 3. Start new timer
        timerRef.current = setTimeout(() => {
            const newData = dataGenerator(); // Generate fresh data
            setData(newData);
            setLoading(false);
        }, delay);
    }, [dataGenerator, delay]);

    // 4. Run on Mount
    useEffect(() => {
        fetchData();

        // Cleanup on unmount
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [fetchData]);

    // Return exactly what the UI needs
    return { data, loading, refetch: fetchData };
}