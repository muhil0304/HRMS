import React from 'react';
import { Bell, Search, Plus, Calendar } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  title: string;
  onAddEmployeeClick: () => void;
  onAddLeaveClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onAddEmployeeClick,
  onAddLeaveClick
}) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Title & Date */}
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:flex">
          <Calendar className="h-3.5 w-3.5 text-slate-500" />
          {today}
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onAddLeaveClick}
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Request Leave
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onAddEmployeeClick}
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>
    </header>
  );
};
