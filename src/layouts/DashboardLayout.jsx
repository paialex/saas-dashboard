import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

export default function DashboardLayout() {
    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900">
            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}