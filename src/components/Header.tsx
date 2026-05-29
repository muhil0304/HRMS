import React from 'react';
import {
  Bell,
  Search,
  Plus,
  Calendar,
  Briefcase,
  LayoutDashboard,
  Users,
  CalendarClock,
  BarChart3,
  UserPlus
} from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  onAddEmployeeClick: () => void;
  onAddLeaveClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  onAddEmployeeClick,
  onAddLeaveClick
}) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'leaves', label: 'Leave Requests', icon: CalendarClock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8 shadow-sm">
      {/* Left: Logo & Brand */}
      <div className="flex items-center gap-2 mr-4 sm:mr-6 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Briefcase className="h-5 w-5" />
        </div>
        <div className="hidden md:block text-left">
          <h1 className="text-sm font-bold text-slate-900 leading-none">HRMS Portal</h1>
          <span className="text-[10px] text-slate-500">Enterprise Suite</span>
        </div>
      </div>

      {/* Middle: Horizontal Navigation Links */}
      <nav className="flex items-center gap-1 sm:gap-2 flex-1 justify-start md:justify-center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: Search, Actions, Notifications, User Profile */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Date (hidden on small screens) */}
        <div className="hidden xl:flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          <Calendar className="h-3.5 w-3.5 text-slate-500" />
          {today}
        </div>

        {/* Search Bar (hidden on small screens) */}
        <div className="relative hidden lg:block w-48 xl:w-64">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        {/* Action Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onAddLeaveClick}
            className="gap-1.5 text-xs"
          >
            <Plus className="h-4 w-4" />
            Request Leave
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onAddEmployeeClick}
            className="gap-1.5 text-xs"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Action Buttons (Mobile) */}
        <div className="flex sm:hidden items-center gap-1">
          <button
            onClick={onAddLeaveClick}
            title="Request Leave"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <CalendarClock className="h-4 w-4" />
          </button>
          <button
            onClick={onAddEmployeeClick}
            title="Add Employee"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4" />
          </button>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-2 sm:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
            BS
          </div>
          <div className="hidden xl:block text-left">
            <h4 className="text-xs font-semibold text-slate-900 leading-none">Bob Smith</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">HR Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};
