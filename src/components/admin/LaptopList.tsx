import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { laptopApi } from '../../lib/api';

function LaptopList() {
  const { data: laptops, isLoading } = useQuery({
    queryKey: ['laptops'],
    queryFn: laptopApi.getAll,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Brand
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serial Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Purchase Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {laptops?.map((laptop) => (
            <tr key={laptop.id}>
              <td className="px-6 py-4 whitespace-nowrap">{laptop.brand}</td>
              <td className="px-6 py-4 whitespace-nowrap">{laptop.model}</td>
              <td className="px-6 py-4 whitespace-nowrap">{laptop.serialNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${laptop.status === 'available' ? 'bg-green-100 text-green-800' :
                    laptop.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'}`}>
                  {laptop.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(laptop.purchaseDate), 'MMM d, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LaptopList;