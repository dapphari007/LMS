import { useState } from 'react';

/**
 * A custom hook for managing leave request filters
 */
export const useLeaveFilters = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Generate year options for filter
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 3 }, (_, i) => currentYear - i);

  // Status options for filter
  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'partially_approved', label: 'Partially Approved' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'pending_deletion', label: 'Pending Deletion' },
  ];

  return {
    selectedYear,
    setSelectedYear,
    selectedStatus,
    setSelectedStatus,
    yearOptions,
    statusOptions
  };
};