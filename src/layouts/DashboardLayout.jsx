import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

export default function DashboardLayout() {
    return (
        // h-screen: Force the app to take exactly 100% of the window height
        // overflow-hidden: Prevent the window itself from scrolling (we scroll internal areas instead)
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900">

            {/* Sidebar: Fixed width, never shrinks */}
            <Sidebar />

            {/* Main Wrapper: Takes all remaining space */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar />

                {/* The Scrollable Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}