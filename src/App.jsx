import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './components/pages/Dashboard';
import Analytics from './components/pages/Analytics';
import Settings from './components/pages/Settings';
import ErrorBoundary from './components/ErrorBoundary'; // <--- Import this
import { DashboardProvider } from './context/DashboardContext';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardProvider>
                <BrowserRouter>
                    <Routes>
                        {/* CRITICAL: The ErrorBoundary wraps the Layout. 
               This means ANY crash inside Layout or its children (Dashboard) 
               will be caught here.
            */}
                        <Route path="/" element={
                            <ErrorBoundary>
                                <DashboardLayout />
                            </ErrorBoundary>
                        }>
                            <Route index element={<Dashboard />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DashboardProvider>
        </QueryClientProvider>
    );
}

export default App;