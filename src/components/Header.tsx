import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  Calendar,
  LayoutDashboard,
  Users,
  CalendarClock,
  BarChart3,
  Briefcase,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">HRMS Portal</h1>
              <span className="text-[10px] font-medium text-slate-500">Enterprise Suite</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Notifications, Actions, Profile, Hamburger */}
        <div className="flex items-center gap-4">
          {/* Today's Date (Desktop only) */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            {today}
          </div>

          {/* Search Bar (Desktop only) */}
          <div className="relative hidden xl:block w-48">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Notifications */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            <Bell className="h-4.5 w-4.5 text-slate-600" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onAddLeaveClick}
              className="gap-1.5 h-9 text-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Request Leave
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onAddEmployeeClick}
              className="gap-1.5 h-9 text-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Employee
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
              BS
            </div>
            <div className="hidden lg:block text-left">
              <h4 className="text-xs font-semibold text-slate-900 leading-none">Bob Smith</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">HR Manager</p>
            </div>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 md:hidden space-y-4">
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Navigation</p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-200 sm:hidden">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Actions</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onAddLeaveClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full gap-1.5 justify-center h-10"
            >
              <Plus className="h-4 w-4" />
              Request Leave
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onAddEmployeeClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full gap-1.5 justify-center h-10"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
