import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Laptop, BarChart3, Users, AlertTriangle } from 'lucide-react';
import { laptopApi, employeeApi, maintenanceApi } from '../../lib/api';
import StatCard from '../../components/StatCard';
import LaptopList from '../../components/admin/LaptopList';

function AdminDashboard() {
  const { data: laptops } = useQuery({
    queryKey: ['laptops'],
    queryFn: laptopApi.getAll,
  });

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: employeeApi.getAll,
  });

  const { data: maintenance } = useQuery({
    queryKey: ['maintenance'],
    queryFn: maintenanceApi.getAll,
  });

  const stats = {
    totalLaptops: laptops?.length ?? 0,
    assignedLaptops: laptops?.filter(l => l.status === 'assigned').length ?? 0,
    totalEmployees: employees?.length ?? 0,
    maintenanceAlerts: maintenance?.filter(m => m.status === 'pending').length ?? 0,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Laptops"
          value={stats.totalLaptops}
          icon={<Laptop className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Assigned Laptops"
          value={stats.assignedLaptops}
          icon={<BarChart3 className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<Users className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Maintenance Alerts"
          value={stats.maintenanceAlerts}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="red"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Laptop Inventory</h2>
        <LaptopList />
      </div>
    </div>
  );
}

export default AdminDashboard;