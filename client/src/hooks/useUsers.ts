import { useQuery } from '@tanstack/react-query';
import { getUsers, getUser } from '../services/userService';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};

export const useUser = (id: string | undefined) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id as string),
    enabled: !!id,
  });
};