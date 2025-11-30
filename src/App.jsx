import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './components/pages/Dashboard';
import Analytics from './components/pages/Analytics';
import Settings from './components/pages/Settings';
import { DashboardProvider } from './context/DashboardContext';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<DashboardLayout />}>
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