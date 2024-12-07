import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { maintenanceApi } from '../../lib/api';
import type { Laptop, MaintenanceRequest } from '../../types';
import { useNotification } from '../../hooks/useNotification';

interface MaintenanceRequestFormProps {
  assignedLaptops: Laptop[];
}

interface FormData {
  laptopId: string;
  description: string;
}

function MaintenanceRequestForm({ assignedLaptops }: MaintenanceRequestFormProps) {
  const queryClient = useQueryClient();
  const { addNotification } = useNotification();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (data: Omit<MaintenanceRequest, 'id' | 'status' | 'loggedAt'>) =>
      maintenanceApi.create({
        ...data,
        status: 'pending',
        loggedAt: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      addNotification('Maintenance request submitted successfully', 'success');
      reset();
    },
    onError: () => {
      addNotification('Failed to submit maintenance request', 'error');
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Laptop</label>
        <select
          {...register('laptopId', { required: 'Please select a laptop' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a laptop</option>
          {assignedLaptops.map(laptop => (
            <option key={laptop.id} value={laptop.id}>
              {laptop.brand} {laptop.model} - {laptop.serialNumber}
            </option>
          ))}
        </select>
        {errors.laptopId && (
          <p className="text-red-500 text-xs mt-1">{errors.laptopId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'Please provide a description' })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe the maintenance needed..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {mutation.isPending ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

export default MaintenanceRequestForm;