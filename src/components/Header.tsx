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
  X,
  ChevronDown,
  User,
  Settings,
  LogOut
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm">
      {/* Top Bar */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-100">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-none tracking-tight">
                HRMS<span className="text-indigo-600">.</span>
              </h1>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Portal</span>
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
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-50/50'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Notifications, Actions, Profile, Hamburger */}
        <div className="flex items-center gap-4">
          {/* Today's Date (Desktop only) */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {today}
          </div>

          {/* Search Bar (Desktop only) */}
          <div className="relative hidden xl:block w-56">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-8 text-xs outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
            <div className="absolute right-2.5 top-2 flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400">
              <span>⌘</span>K
            </div>
          </div>

          {/* Notifications */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 shadow-sm">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
          </button>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onAddLeaveClick}
              className="gap-1.5 h-9 text-xs font-medium border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm rounded-xl"
            >
              <Plus className="h-3.5 w-3.5 text-slate-500" />
              Request Leave
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onAddEmployeeClick}
              className="gap-1.5 h-9 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-200 rounded-xl"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Employee
            </Button>
          </div>

          {/* User Profile */}
          <div className="relative flex items-center gap-2 border-l border-slate-200 pl-4">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-sm">
                  BS
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div className="hidden lg:block text-left">
                <h4 className="text-xs font-semibold text-slate-900 leading-none">Bob Smith</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">HR Manager</p>
              </div>
              <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black/5">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">Bob Smith</p>
                  <p className="text-[10px] text-slate-500">bob.smith@company.com</p>
                </div>
                <div className="py-1">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    My Profile
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
                    <Settings className="h-3.5 w-3.5 text-slate-400" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-slate-100 pt-1">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50">
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-xl p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-slate-50/90 backdrop-blur-md px-4 py-4 md:hidden space-y-4">
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
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
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
              className="w-full gap-1.5 h-9 text-xs rounded-xl"
            >
              <Plus className="h-3.5 w-3.5" />
              Request Leave
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onAddEmployeeClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full gap-1.5 h-9 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Employee
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};