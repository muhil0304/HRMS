import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  Employee,
  LeaveRequest,
  HRMetrics,
  AttendanceTrend,
  DepartmentDistribution,
  ActivityLog
} from '../types/hrms';

interface HRMSContextType {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  metrics: HRMetrics;
  attendanceTrend: AttendanceTrend[];
  departmentDistribution: DepartmentDistribution[];
  activityLogs: ActivityLog[];
  addEmployee: (employee: Omit<Employee, 'id' | 'joinDate'>) => void;
  updateEmployeeStatus: (id: string, status: Employee['status']) => void;
  approveLeaveRequest: (id: string) => void;
  rejectLeaveRequest: (id: string) => void;
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'status'>) => void;
}

export const HRMSContext = createContext<HRMSContextType | undefined>(undefined);

const initialEmployees: Employee[] = [
  { id: 'EMP001', name: 'Alice Johnson', role: 'Lead Software Engineer', department: 'Engineering', email: 'alice.j@company.com', status: 'Active', joinDate: '2022-03-15' },
  { id: 'EMP002', name: 'Bob Smith', role: 'HR Manager', department: 'Human Resources', email: 'bob.smith@company.com', status: 'Active', joinDate: '2021-06-01' },
  { id: 'EMP003', name: 'Charlie Brown', role: 'Product Manager', department: 'Product', email: 'charlie.b@company.com', status: 'On Leave', joinDate: '2023-01-10' },
  { id: 'EMP004', name: 'Diana Prince', role: 'Senior UX Designer', department: 'Design', email: 'diana.p@company.com', status: 'Active', joinDate: '2022-11-01' },
  { id: 'EMP005', name: 'Evan Wright', role: 'Frontend Developer', department: 'Engineering', email: 'evan.w@company.com', status: 'Active', joinDate: '2024-02-15' },
  { id: 'EMP006', name: 'Fiona Gallagher', role: 'Marketing Lead', department: 'Marketing', email: 'fiona.g@company.com', status: 'Active', joinDate: '2023-08-20' },
  { id: 'EMP007', name: 'George Costanza', role: 'Sales Specialist', department: 'Sales', email: 'george.c@company.com', status: 'Active', joinDate: '2024-05-01' }
];

const initialLeaveRequests: LeaveRequest[] = [
  { id: 'LR001', employeeId: 'EMP003', employeeName: 'Charlie Brown', type: 'Annual', startDate: '2026-06-01', endDate: '2026-06-10', status: 'Pending', reason: 'Family vacation in Hawaii' },
  { id: 'LR002', employeeId: 'EMP006', employeeName: 'Fiona Gallagher', type: 'Sick', startDate: '2026-05-28', endDate: '2026-05-30', status: 'Approved', reason: 'Dental wisdom tooth extraction' },
  { id: 'LR003', employeeId: 'EMP005', employeeName: 'Evan Wright', type: 'Personal', startDate: '2026-06-05', endDate: '2026-06-06', status: 'Pending', reason: 'Relocating to a new apartment' },
  { id: 'LR004', employeeId: 'EMP001', employeeName: 'Alice Johnson', type: 'Maternity', startDate: '2026-07-01', endDate: '2026-10-01', status: 'Pending', reason: 'Maternity leave' }
];

const initialAttendanceTrend: AttendanceTrend[] = [
  { date: 'Mon', present: 6, absent: 0, onLeave: 1 },
  { date: 'Tue', present: 6, absent: 0, onLeave: 1 },
  { date: 'Wed', present: 5, absent: 1, onLeave: 1 },
  { date: 'Thu', present: 6, absent: 0, onLeave: 1 },
  { date: 'Fri', present: 5, absent: 0, onLeave: 2 },
  { date: 'Sat', present: 0, absent: 0, onLeave: 2 },
  { date: 'Sun', present: 0, absent: 0, onLeave: 2 }
];

const initialDepartmentDistribution: DepartmentDistribution[] = [
  { name: 'Engineering', value: 2, color: '#3b82f6' },
  { name: 'Human Resources', value: 1, color: '#ec4899' },
  { name: 'Product', value: 1, color: '#f59e0b' },
  { name: 'Design', value: 1, color: '#10b981' },
  { name: 'Marketing', value: 1, color: '#8b5cf6' },
  { name: 'Sales', value: 1, color: '#6366f1' }
];

const initialActivityLogs: ActivityLog[] = [
  { id: 'LOG001', type: 'Leave', message: 'Charlie Brown submitted a pending request for Annual Leave', timestamp: '2 hours ago', user: 'Charlie Brown' },
  { id: 'LOG002', type: 'Leave', message: 'Fiona Gallagher\'s Sick Leave request was approved', timestamp: '5 hours ago', user: 'Bob Smith' },
  { id: 'LOG003', type: 'Employee', message: 'George Costanza was onboarded as Sales Specialist', timestamp: '1 day ago', user: 'Bob Smith' },
  { id: 'LOG004', type: 'System', message: 'Monthly payroll processing initiated successfully', timestamp: '2 days ago', user: 'System' }
];

export const HRMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [metrics, setMetrics] = useState<HRMetrics>({
    totalEmployees: 0,
    activeLeaves: 0,
    pendingRequests: 0,
    onboardingProgress: 85
  });

  // Calculate metrics dynamically based on state
  useEffect(() => {
    const total = employees.filter(e => e.status !== 'Terminated').length;
    const activeLeaves = employees.filter(e => e.status === 'On Leave').length;
    const pending = leaveRequests.filter(r => r.status === 'Pending').length;
    
    setMetrics(prev => ({
      ...prev,
      totalEmployees: total,
      activeLeaves: activeLeaves,
      pendingRequests: pending
    }));
  }, [employees, leaveRequests]);

  const addEmployee = (newEmp: Omit<Employee, 'id' | 'joinDate'>) => {
    const id = `EMP00${employees.length + 1}`;
    const joinDate = new Date().toISOString().split('T')[0];
    const employee: Employee = {
      ...newEmp,
      id,
      joinDate
    };
    setEmployees(prev => [...prev, employee]);

    // Add log
    const log: ActivityLog = {
      id: `LOG${Date.now()}`,
      type: 'Employee',
      message: `New employee ${employee.name} (${employee.role}) was added to ${employee.department}`,
      timestamp: 'Just now',
      user: 'Bob Smith'
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  const updateEmployeeStatus = (id: string, status: Employee['status']) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? { ...emp, status } : emp))
    );

    const empName = employees.find(e => e.id === id)?.name || 'Employee';
    const log: ActivityLog = {
      id: `LOG${Date.now()}`,
      type: 'Employee',
      message: `Employee ${empName}'s status was updated to ${status}`,
      timestamp: 'Just now',
      user: 'Bob Smith'
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  const approveLeaveRequest = (id: string) => {
    let empId = '';
    let empName = '';
    
    setLeaveRequests(prev =>
      prev.map(req => {
        if (req.id === id) {
          empId = req.employeeId;
          empName = req.employeeName;
          return { ...req, status: 'Approved' };
        }
        return req;
      })
    );

    // Update employee status to 'On Leave'
    if (empId) {
      setEmployees(prev =>
        prev.map(emp => (emp.id === empId ? { ...emp, status: 'On Leave' } : emp))
      );
    }

    const log: ActivityLog = {
      id: `LOG${Date.now()}`,
      type: 'Leave',
      message: `${empName}'s Leave request was approved`,
      timestamp: 'Just now',
      user: 'Bob Smith'
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  const rejectLeaveRequest = (id: string) => {
    let empName = '';
    setLeaveRequests(prev =>
      prev.map(req => {
        if (req.id === id) {
          empName = req.employeeName;
          return { ...req, status: 'Rejected' };
        }
        return req;
      })
    );

    const log: ActivityLog = {
      id: `LOG${Date.now()}`,
      type: 'Leave',
      message: `${empName}'s Leave request was rejected`,
      timestamp: 'Just now',
      user: 'Bob Smith'
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  const addLeaveRequest = (newReq: Omit<LeaveRequest, 'id' | 'status'>) => {
    const id = `LR00${leaveRequests.length + 1}`;
    const request: LeaveRequest = {
      ...newReq,
      id,
      status: 'Pending'
    };
    setLeaveRequests(prev => [...prev, request]);

    const log: ActivityLog = {
      id: `LOG${Date.now()}`,
      type: 'Leave',
      message: `${request.employeeName} submitted a pending request for ${request.type} Leave`,
      timestamp: 'Just now',
      user: 'Bob Smith'
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  return (
    <HRMSContext.Provider
      value={{
        employees,
        leaveRequests,
        metrics,
        attendanceTrend: initialAttendanceTrend,
        departmentDistribution: initialDepartmentDistribution,
        activityLogs,
        addEmployee,
        updateEmployeeStatus,
        approveLeaveRequest,
        rejectLeaveRequest,
        addLeaveRequest
      }}
    >
      {children}
    </HRMSContext.Provider>
  );
};