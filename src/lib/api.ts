import axios from 'axios';
import type { Laptop, Employee, Assignment, MaintenanceRequest, Issue } from '../types';
import {
  mockLaptops,
  mockEmployees,
  mockAssignments,
  mockMaintenanceRequests,
  mockIssues,
} from './mockData';

// Mock API implementation
export const laptopApi = {
  getAll: () => Promise.resolve(mockLaptops),
  getById: (id: string) => Promise.resolve(mockLaptops.find(l => l.id === id)),
  create: (data: Omit<Laptop, 'id'>) =>
    Promise.resolve({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    } as Laptop),
  update: (id: string, data: Partial<Laptop>) =>
    Promise.resolve({
      ...mockLaptops.find(l => l.id === id),
      ...data,
    } as Laptop),
  delete: (id: string) => Promise.resolve(),
};

export const employeeApi = {
  getAll: () => Promise.resolve(mockEmployees),
  getById: (id: string) => Promise.resolve(mockEmployees.find(e => e.id === id)),
  create: (data: Omit<Employee, 'id'>) =>
    Promise.resolve({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    } as Employee),
};

export const assignmentApi = {
  getAll: () => Promise.resolve(mockAssignments),
  create: (data: Omit<Assignment, 'id'>) =>
    Promise.resolve({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    } as Assignment),
  update: (id: string, data: Partial<Assignment>) =>
    Promise.resolve({
      ...mockAssignments.find(a => a.id === id),
      ...data,
    } as Assignment),
};

export const maintenanceApi = {
  getAll: () => Promise.resolve(mockMaintenanceRequests),
  create: (data: Omit<MaintenanceRequest, 'id'>) =>
    Promise.resolve({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    } as MaintenanceRequest),
};

export const issueApi = {
  getAll: () => Promise.resolve(mockIssues),
  create: (data: Omit<Issue, 'id'>) =>
    Promise.resolve({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    } as Issue),
  update: (id: string, data: Partial<Issue>) =>
    Promise.resolve({
      ...mockIssues.find(i => i.id === id),
      ...data,
    } as Issue),
};