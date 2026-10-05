export interface Leave {
  leaveId: number;
  employeeId: number;
  leaveType: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: string | null;
  createdAt: string | null;
}

export interface CreateLeaveRequest {
  employeeId: number;
  leaveType: string;
  reason: string;
  startDate: string;
  endDate: string;
  status?: string;
}