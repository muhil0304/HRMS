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
  ChevronDown
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/80 transition-all duration-200">
      {/* Top Bar */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => setView('dashboard')} 
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 bg-clip-text text-transparent">
                  HRMS
                </span>
                <span className="text-base font-light tracking-tight text-slate-500">
                  Portal
                </span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Enterprise
                </span>
              </div>
              <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase leading-none mt-0.5">
                Management Suite
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1 rounded-xl border border-slate-200/40">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                      : 'text-slate-600 hover:bg-white/50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Notifications, Actions, Profile, Hamburger */}
        <div className="flex items-center gap-4">
          {/* Today's Date (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/50 px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span>{today}</span>
          </div>

          {/* Search Bar (Desktop only) */}
          <div className="relative hidden xl:flex items-center w-52">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-12 text-xs outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
            <div className="absolute right-2 flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-medium text-slate-400 shadow-sm pointer-events-none">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm">
            <Bell className="h-4.5 w-4.5 text-slate-600" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          </button>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onAddLeaveClick}
              className="gap-1.5 h-9 text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all duration-200"
            >
              <CalendarClock className="h-3.5 w-3.5 text-slate-500" />
              Request Leave
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onAddEmployeeClick}
              className="gap-1.5 h-9 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm shadow-blue-100 hover:shadow-md transition-all duration-200 border-0"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Employee
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 border-l border-slate-200 pl-4 cursor-pointer group">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-sm">
                BS
              </div>
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-none">
                  Bob Smith
                </h4>
                <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">HR Manager</p>
            </div>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-lg md:hidden transition-all duration-300 ease-in-out z-50">
          <div className="px-4 py-5 space-y-5">
            {/* Search Bar for Mobile */}
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Navigation
              </p>
              <div className="grid grid-cols-2 gap-2">
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
                      className={`flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Quick Actions
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    onAddLeaveClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full gap-2 h-10 text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
                >
                  <CalendarClock className="h-4 w-4 text-slate-500" />
                  Request Leave
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    onAddEmployeeClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full gap-2 h-10 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Employee
                </Button>
              </div>
            </div>

            {/* Mobile Date & User Info */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{today}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-500">System Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};