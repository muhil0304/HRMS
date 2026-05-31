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
  const [searchFocused, setSearchFocused] = useState(false);

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/85 backdrop-blur-md transition-all duration-200">
      {/* Top Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-indigo-200">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                    HRMS<span className="font-light text-slate-500 ml-1">Portal</span>
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
                    Enterprise Suite
                  </span>
                </div>
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                  Enterprise
                </span>
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
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-50/80 text-indigo-600 font-semibold shadow-sm shadow-indigo-100/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? 'scale-110 text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Search, Notifications, Actions, Profile, Hamburger */}
          <div className="flex items-center gap-4">
            
            {/* Today's Date (Desktop only) */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100/80 px-3 py-1.5 text-xs font-medium">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {today}
            </div>

            {/* Search Bar (Desktop only) */}
            <div className="relative hidden xl:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`h-9 rounded-full border border-slate-200/80 bg-slate-50/50 pl-9 pr-4 text-xs text-slate-700 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 ${
                  searchFocused ? 'w-56' : 'w-36'
                }`}
              />
            </div>

            {/* Notification Bell */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-200 shadow-sm">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </button>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onAddLeaveClick}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all duration-200 rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5 h-9"
              >
                <Plus className="h-3.5 w-3.5" />
                Request Leave
              </button>
              <button
                onClick={onAddEmployeeClick}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-sm shadow-indigo-200 hover:shadow-md transition-all duration-200 rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5 h-9"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Employee
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2.5 border-l border-slate-200/80 pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-sm shadow-indigo-200">
                BS
              </div>
              <div className="hidden lg:block text-left">
                <h4 className="text-xs font-semibold text-slate-800 leading-none">Bob Smith</h4>
                <p className="text-[10px] font-medium text-slate-400 mt-1">HR Manager</p>
              </div>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 md:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-lg px-6 py-6 space-y-6 md:hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          {/* Mobile Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

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
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                onAddLeaveClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all duration-200 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Request Leave
            </button>
            <button
              onClick={() => {
                onAddEmployeeClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-sm shadow-indigo-200 hover:shadow-md transition-all duration-200 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </button>
          </div>

          {/* Mobile Footer Info */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-sm">
                BS
              </div>
              <div className="text-left">
                <h4 className="text-xs font-semibold text-slate-800 leading-none">Bob Smith</h4>
                <p className="text-[10px] font-medium text-slate-400 mt-1">HR Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100/80 px-3 py-1.5 text-xs font-medium">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {today}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};