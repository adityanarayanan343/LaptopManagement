export interface Laptop {
  id: string;
  brand: string;
  model: string;
  serialNumber: string;
  status: 'available' | 'assigned' | 'maintenance';
  purchaseDate: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
}

export interface Assignment {
  id: string;
  laptopId: string;
  employeeId: string;
  assignedAt: string;
  returnedAt?: string;
}

export interface MaintenanceRequest {
  id: string;
  laptopId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  cost?: number;
  loggedAt: string;
}

export interface Issue {
  id: string;
  laptopId: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  reportedBy: string;
  reportedAt: string;
}