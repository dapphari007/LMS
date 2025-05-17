import { useQuery } from '@tanstack/react-query';
import { getHolidays, getHoliday, GetHolidaysParams } from '../services/holidayService';

export const useHolidays = (params?: GetHolidaysParams) => {
  return useQuery({
    queryKey: ['holidays', params],
    queryFn: () => getHolidays(params),
  });
};

export const useHoliday = (id: string | undefined) => {
  return useQuery({
    queryKey: ['holiday', id],
    queryFn: () => getHoliday(id as string),
    enabled: !!id,
  });
};