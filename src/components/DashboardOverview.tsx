import React from 'react';
import { Users, Calendar, Clock, UserCheck, ArrowUpRight, Activity } from 'lucide-react';
import { useHRMS } from '../hooks/useHRMS';
import { Card } from './ui/Card';

export const DashboardOverview: React.FC = () => {
  const { metrics, activityLogs } = useHRMS();

  const cards = [
    {
      title: 'Total Employees',
      value: metrics.totalEmployees,
      change: '+2 this month',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      title: 'Active Leaves',
      value: metrics.activeLeaves,
      change: '1 returning tomorrow',
      icon: Calendar,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Pending Requests',
      value: metrics.pendingRequests,
      change: 'Needs immediate review',
      icon: Clock,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      title: 'Onboarding Progress',
      value: `${metrics.onboardingProgress}%`,
      change: '3 new hires active',
      icon: UserCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.title}</p>
                  <h4 className="text-3xl font-bold text-slate-900 mt-2">{card.value}</h4>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-slate-500">
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                <span>{card.change}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Welcome Card */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none hover:shadow-lg">
          <div className="flex h-full flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-2xl font-bold">Welcome back, Bob!</h3>
              <p className="text-blue-100 mt-2 max-w-md text-sm leading-relaxed">
                You have {metrics.pendingRequests} pending leave requests that require your attention. The overall employee satisfaction index is at an all-time high of 94%.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="block text-xs text-blue-200">System Status</span>
                <span className="text-sm font-semibold">All Systems Operational</span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="block text-xs text-blue-200">Next Holiday</span>
                <span className="text-sm font-semibold">Memorial Day (May 25)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity Log */}
        <Card title="Recent Activity" subtitle="Real-time system actions log" className="h-full">
          <div className="flow-root">
            <ul className="-mb-8">
              {activityLogs.slice(0, 4).map((log, logIdx) => (
                <li key={log.id}>
                  <div className="relative pb-8">
                    {logIdx !== activityLogs.slice(0, 4).length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white ${
                          log.type === 'Leave' ? 'bg-amber-50 text-amber-600' :
                          log.type === 'Employee' ? 'bg-blue-50 text-blue-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          <Activity className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 pt-1.5">
                        <p className="text-xs text-slate-500">
                          {log.message}{' '}
                          <span className="font-medium text-slate-900">by {log.user}</span>
                        </p>
                        <div className="text-right text-xs whitespace-nowrap text-slate-400 mt-1">
                          <time>{log.timestamp}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};
