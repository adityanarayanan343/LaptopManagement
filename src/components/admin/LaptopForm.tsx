import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { laptopApi } from '../../lib/api';
import type { Laptop } from '../../types';

interface LaptopFormProps {
  laptop?: Laptop;
  onClose: () => void;
}

interface FormData {
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
}

function LaptopForm({ laptop, onClose }: LaptopFormProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: laptop ? {
      brand: laptop.brand,
      model: laptop.model,
      serialNumber: laptop.serialNumber,
      purchaseDate: laptop.purchaseDate.split('T')[0],
    } : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      if (laptop) {
        return laptopApi.update(laptop.id, data);
      }
      return laptopApi.create({
        ...data,
        status: 'available',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laptops'] });
      onClose();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <input
          type="text"
          {...register('brand', { required: 'Brand is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.brand && (
          <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Model</label>
        <input
          type="text"
          {...register('model', { required: 'Model is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.model && (
          <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Serial Number</label>
        <input
          type="text"
          {...register('serialNumber', { required: 'Serial number is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.serialNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.serialNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
        <input
          type="date"
          {...register('purchaseDate', { required: 'Purchase date is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.purchaseDate && (
          <p className="text-red-500 text-xs mt-1">{errors.purchaseDate.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {mutation.isPending ? 'Saving...' : laptop ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

export default LaptopForm;