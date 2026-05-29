import React, { useState } from 'react';
import { HRMSProvider } from './context/HRMSContext';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { LeaveRequests } from './components/LeaveRequests';
import { EmployeeList } from './components/EmployeeList';
import { useHRMS } from './hooks/useHRMS';
import { Button } from './components/ui/Button';
import { X } from 'lucide-react';
import { Footer } from './components/Footer';

const DashboardContent: React.FC = () => {
  const [currentView, setView] = useState('dashboard');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);

  const { addEmployee, addLeaveRequest, employees } = useHRMS();

  // Form states
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    email: '',
    status: 'Active' as const
  });

  const [newLeave, setNewLeave] = useState({
    employeeId: '',
    type: 'Annual' as const,
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleAddEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.role || !newEmployee.email) return;
    addEmployee(newEmployee);
    setNewEmployee({
      name: '',
      role: '',
      department: 'Engineering',
      email: '',
      status: 'Active'
    });
    setIsAddEmployeeOpen(false);
  };

  const handleAddLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeave.employeeId || !newLeave.startDate || !newLeave.endDate || !newLeave.reason) return;
    
    const selectedEmp = employees.find(emp => emp.id === newLeave.employeeId);
    if (!selectedEmp) return;

    addLeaveRequest({
      employeeId: newLeave.employeeId,
      employeeName: selectedEmp.name,
      type: newLeave.type,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      reason: newLeave.reason
    });

    setNewLeave({
      employeeId: '',
      type: 'Annual',
      startDate: '',
      endDate: '',
      reason: ''
    });
    setIsAddLeaveOpen(false);
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'employees':
        return 'Employee Directory';
      case 'leaves':
        return 'Leave Management';
      case 'analytics':
        return 'Workforce Analytics';
      default:
        return 'HRMS Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen">
        <Header
          currentView={currentView}
          setView={setView}
          onAddEmployeeClick={() => setIsAddEmployeeOpen(true)}
          onAddLeaveClick={() => setIsAddLeaveOpen(true)}
        />

        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{getViewTitle()}</h2>
              <p className="text-sm text-slate-500 mt-1">
                {currentView === 'dashboard' && "Welcome back! Here's what's happening with your workforce today."}
                {currentView === 'employees' && "Manage your organization's employee records and directory."}
                {currentView === 'leaves' && "Review and manage employee leave requests and balances."}
                {currentView === 'analytics' && "Analyze workforce metrics, attendance trends, and department distributions."}
              </p>
            </div>
          </div>

          {currentView === 'dashboard' && <DashboardOverview />}
          {currentView === 'employees' && <EmployeeList />}
          {currentView === 'leaves' && <LeaveRequests />}
          {currentView === 'analytics' && <AnalyticsCharts />}
        </main>
        <Footer />
      </div>

      {/* Add Employee Modal */}
      {isAddEmployeeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Add New Employee</h3>
              <button
                onClick={() => setIsAddEmployeeOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployeeSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
                <input
                  type="text"
                  required
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  placeholder="John Doe"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  placeholder="john.doe@company.com"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Role</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                    placeholder="Software Engineer"
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Department</label>
                  <select
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsAddEmployeeOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Add Employee
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Leave Modal */}
      {isAddLeaveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Request Leave</h3>
              <button
                onClick={() => setIsAddLeaveOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddLeaveSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Employee</label>
                <select
                  required
                  value={newLeave.employeeId}
                  onChange={(e) => setNewLeave({ ...newLeave, employeeId: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                >
                  <option value="">Select Employee</option>
                  {employees.filter(e => e.status !== 'Terminated').map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Leave Type</label>
                <select
                  value={newLeave.type}
                  onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value as any })}
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                >
                  <option value="Annual">Annual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Maternity">Maternity Leave</option>
                  <option value="Personal">Personal Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">End Date</label>
                  <input
                    type="date"
                    required
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Reason</label>
                <textarea
                  required
                  rows={3}
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                  placeholder="Provide a brief reason for the leave request..."
                  className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsAddLeaveOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HRMSProvider>
      <DashboardContent />
    </HRMSProvider>
  );
};

export default App;
