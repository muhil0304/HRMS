import React from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  BarChart3,
  Settings,
  LogOut,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'leaves', label: 'Leave Requests', icon: CalendarClock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r border-slate-200 bg-slate-900 text-slate-400">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Briefcase className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-none">HRMS Portal</h1>
          <span className="text-xs text-slate-500">Enterprise Suite</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile Quick Info */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-800 transition-colors cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
            BS
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold text-white truncate">Bob Smith</h4>
            <p className="text-xs text-slate-500 truncate">HR Manager</p>
          </div>
          <button className="text-slate-500 hover:text-rose-400">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
