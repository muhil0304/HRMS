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
  LogOut
} from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  title: string;
  onAddEmployeeClick: () => void;
  onAddLeaveClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  title,
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

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo & Desktop Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-100">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">HRMS Portal</h1>
              <span className="text-[10px] font-medium text-slate-400">Enterprise Suite</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
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

        {/* Right Side: Actions, Search, Notifications, Profile, Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Bar (Desktop) */}
          <div className="relative hidden xl:block w-48 2xl:w-64">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Date Badge (Hidden on small screens) */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            {today}
          </div>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {/* Action Buttons (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2">
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

          {/* User Profile */}
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
              BS
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-sm font-semibold text-slate-900 leading-none">Bob Smith</h4>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">HR Manager</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 shadow-inner">
          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation</p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Action Buttons */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2 px-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAddLeaveClick();
                }}
                className="w-full justify-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Leave
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAddEmployeeClick();
                }}
                className="w-full justify-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Employee
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
