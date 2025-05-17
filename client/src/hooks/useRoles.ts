import { useQuery } from '@tanstack/react-query';
import { getAllRoles, getActiveRoles, getRoleById } from '../services/roleService';

export const useRoles = (params?: { isActive?: boolean }) => {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => getAllRoles(params),
  });
};

export const useActiveRoles = () => {
  return useQuery({
    queryKey: ['activeRoles'],
    queryFn: () => getActiveRoles(),
  });
};

export const useRole = (id: string | undefined) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => getRoleById(id as string),
    enabled: !!id,
  });
};