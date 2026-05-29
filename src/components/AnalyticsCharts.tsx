import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { useHRMS } from '../hooks/useHRMS';
import { Card } from './ui/Card';

export const AnalyticsCharts: React.FC = () => {
  const { attendanceTrend, departmentDistribution, employees } = useHRMS();

  // Calculate dynamic department distribution based on active employees
  const dynamicDistribution = React.useMemo(() => {
    const counts: Record<string, number> = {};
    employees.forEach(emp => {
      if (emp.status !== 'Terminated') {
        counts[emp.department] = (counts[emp.department] || 0) + 1;
      }
    });

    const colors = ['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#6366f1', '#14b8a6'];
    return Object.keys(counts).map((dept, index) => ({
      name: dept,
      value: counts[dept],
      color: colors[index % colors.length]
    }));
  }, [employees]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Attendance Trend Chart */}
      <Card
        title="Weekly Attendance Trend"
        subtitle="Daily breakdown of employee attendance"
        className="lg:col-span-2"
      >
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={attendanceTrend}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area
                type="monotone"
                dataKey="present"
                name="Present"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorPresent)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="onLeave"
                name="On Leave"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorLeave)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Department Distribution Chart */}
      <Card
        title="Department Distribution"
        subtitle="Active headcount by department"
        className="h-full"
      >
        <div className="flex h-80 flex-col justify-between">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dynamicDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {dynamicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {dynamicDistribution.map((dept, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: dept.color }}
                />
                <span className="truncate text-slate-600 font-medium">
                  {dept.name} ({dept.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
