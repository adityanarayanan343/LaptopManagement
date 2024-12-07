import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { issueApi } from '../../lib/api';
import { useAuthStore } from '../../store/auth';
import { useNotification } from '../../hooks/useNotification';
import type { Laptop, Issue } from '../../types';

interface IssueReportFormProps {
  assignedLaptops: Laptop[];
}

interface FormData {
  laptopId: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

function IssueReportForm({ assignedLaptops }: IssueReportFormProps) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const { addNotification } = useNotification();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (data: Omit<Issue, 'id' | 'status' | 'reportedAt' | 'reportedBy'>) =>
      issueApi.create({
        ...data,
        status: 'open',
        reportedAt: new Date().toISOString(),
        reportedBy: user?.id || '',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      addNotification('Issue reported successfully', 'success');
      reset();
    },
    onError: () => {
      addNotification('Failed to report issue', 'error');
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
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          {...register('priority', { required: 'Please select priority' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'Please provide a description' })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe the issue..."
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
        {mutation.isPending ? 'Submitting...' : 'Submit Issue'}
      </button>
    </form>
  );
}

export default IssueReportForm;