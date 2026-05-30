import React from 'react';
import { Briefcase } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white">
            <Briefcase className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-slate-700">HRMS Portal</span>
        </div>
        <p className="text-center sm:text-right">
          Copyright &copy; 2026 HRMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};