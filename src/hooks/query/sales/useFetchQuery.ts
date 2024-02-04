import { getDaySales } from '@/server/api/supabase/sales';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

const enum SalesQueryKey {
  STATUS = 'STATUS',
  CALENDAR = 'CALENDAR',
}

const enum DateQueryKey {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTHS = 'MONTHS',
  MONTH = 'MONTH',
}

export const useFetchDayQuery = (day: Dayjs, storeId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [SalesQueryKey.STATUS, DateQueryKey.DAY],
    queryFn: () => getDaySales(day.hour(0).subtract(9, 'hour'), storeId),
  });

  return { data, isError, isLoading };
};
