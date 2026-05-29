import React, { useState } from 'react';
import { Check, X, Calendar, FileText, User } from 'lucide-react';
import { useHRMS } from '../hooks/useHRMS';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export const LeaveRequests: React.FC = () => {
  const { leaveRequests, approveLeaveRequest, rejectLeaveRequest } = useHRMS();
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filteredRequests = leaveRequests.filter(req => {
    if (filter === 'All') return true;
    return req.status === filter;
  });

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Annual':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Sick':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Maternity':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Personal':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex gap-2">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          Total: {filteredRequests.length}
        </span>
      </div>

      {/* Requests Grid */}
      {filteredRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Calendar className="h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">No leave requests found</h3>
          <p className="mt-1 text-sm text-slate-500">There are no requests matching the selected filter.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredRequests.map((req) => (
            <Card key={req.id} className="flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-bold">
                      {req.employeeName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{req.employeeName}</h4>
                      <p className="text-xs text-slate-500">ID: {req.employeeId}</p>
                    </div>
                  </div>
                  <Badge variant={getBadgeVariant(req.status)}>{req.status}</Badge>
                </div>

                {/* Leave Details */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold border ${getTypeColor(req.type)}`}>
                      {req.type} Leave
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>
                      {req.startDate} to {req.endDate}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <FileText className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                    <p className="italic text-slate-500">"{req.reason}"</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {req.status === 'Pending' && (
                <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => approveLeaveRequest(req.id)}
                    className="flex-1 gap-1.5"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => rejectLeaveRequest(req.id)}
                    className="flex-1 gap-1.5"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
