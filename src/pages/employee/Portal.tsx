import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Laptop, Wrench, AlertCircle } from 'lucide-react';
import { laptopApi, assignmentApi } from '../../lib/api';
import { useAuthStore } from '../../store/auth';
import MaintenanceRequestForm from '../../components/employee/MaintenanceRequestForm';
import IssueReportForm from '../../components/employee/IssueReportForm';

function EmployeePortal() {
  const user = useAuthStore((state) => state.user);

  const { data: assignments } = useQuery({
    queryKey: ['assignments'],
    queryFn: assignmentApi.getAll,
  });

  const { data: laptops } = useQuery({
    queryKey: ['laptops'],
    queryFn: laptopApi.getAll,
  });

  const userAssignments = assignments?.filter(a => !a.returnedAt);
  const assignedLaptops = laptops?.filter(l => 
    userAssignments?.some(a => a.laptopId === l.id)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Portal</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Laptop className="w-5 h-5 mr-2" />
            Your Assigned Laptops
          </h2>
          {assignedLaptops?.length === 0 ? (
            <p className="text-gray-500">No laptops currently assigned</p>
          ) : (
            <ul className="space-y-4">
              {assignedLaptops?.map(laptop => (
                <li key={laptop.id} className="border-b pb-4">
                  <h3 className="font-medium">{laptop.brand} {laptop.model}</h3>
                  <p className="text-sm text-gray-500">Serial: {laptop.serialNumber}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Request Maintenance
            </h2>
            <MaintenanceRequestForm assignedLaptops={assignedLaptops || []} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Report Issue
            </h2>
            <IssueReportForm assignedLaptops={assignedLaptops || []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePortal;