import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export default function Sidebar() {

    const { data: user } = useUser();

    return (
        <aside className="flex w-64 flex-col bg-slate-900 text-white transition-all">
            {/* Logo Area */}
            <div className="flex h-16 items-center justify-center border-b border-slate-800 shadow-md">
                <h1 className="text-xl font-bold tracking-wider text-blue-400">
                    SaaS<span className="text-white">Kit</span>
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2 px-3 py-6">
                <NavItem to="/" label="Dashboard" icon="📊" />
                <NavItem to="/analytics" label="Analytics" icon="📈" />
                <NavItem to="/settings" label="Settings" icon="⚙️" />
            </nav>

            {/* User Footer */}
            <div className="border-t border-slate-800 p-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500">
                        {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="text-sm">
                        <p className="font-medium">{user?.fullName || 'Loading...'}</p>
                        <p className="text-xs text-slate-400">{user?.role || 'User'}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

// Helper Component for consistent links
function NavItem({ to, label, icon }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
            <span>{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}