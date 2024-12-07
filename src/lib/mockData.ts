import type { Laptop, Employee, Assignment, MaintenanceRequest, Issue } from '../types';

// Mock Laptops
export const mockLaptops: Laptop[] = [
  {
    id: '1',
    brand: 'Dell',
    model: 'XPS 13',
    serialNumber: 'DL-XPS13-001',
    status: 'available',
    purchaseDate: '2023-01-15',
  },
  {
    id: '2',
    brand: 'MacBook',
    model: 'Pro M2',
    serialNumber: 'MB-PRO-002',
    status: 'assigned',
    purchaseDate: '2023-03-20',
  },
  {
    id: '3',
    brand: 'Lenovo',
    model: 'ThinkPad X1',
    serialNumber: 'LN-X1-003',
    status: 'maintenance',
    purchaseDate: '2023-02-10',
  },
  {
    id: '4',
    brand: 'HP',
    model: 'EliteBook',
    serialNumber: 'HP-EB-004',
    status: 'available',
    purchaseDate: '2023-04-05',
  },
  {
    id: '5',
    brand: 'ASUS',
    model: 'ZenBook',
    serialNumber: 'AS-ZB-005',
    status: 'assigned',
    purchaseDate: '2023-05-12',
  },
];

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'Design',
  },
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: '1',
    laptopId: '2',
    employeeId: '1',
    assignedAt: '2023-03-21',
  },
  {
    id: '2',
    laptopId: '5',
    employeeId: '2',
    assignedAt: '2023-05-13',
  },
];

// Mock Maintenance Requests
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    laptopId: '3',
    description: 'Screen flickering issues',
    status: 'in-progress',
    cost: 150,
    loggedAt: '2023-06-01',
  },
];

// Mock Issues
export const mockIssues: Issue[] = [
  {
    id: '1',
    laptopId: '2',
    description: 'Battery draining quickly',
    priority: 'medium',
    status: 'open',
    reportedBy: '1',
    reportedAt: '2023-06-15',
  },
];