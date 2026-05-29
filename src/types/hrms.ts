export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  avatarUrl?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Annual' | 'Sick' | 'Maternity' | 'Unpaid' | 'Personal';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

export interface HRMetrics {
  totalEmployees: number;
  activeLeaves: number;
  pendingRequests: number;
  onboardingProgress: number; // percentage
}

export interface AttendanceTrend {
  date: string;
  present: number;
  absent: number;
  onLeave: number;
}

export interface DepartmentDistribution {
  name: string;
  value: number;
  color: string;
}

export interface ActivityLog {
  id: string;
  type: 'Leave' | 'Employee' | 'System';
  message: string;
  timestamp: string;
  user: string;
}
