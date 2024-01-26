import { getUserToken } from '@/server/api/supabase/user-token';
import { useQuery } from '@tanstack/react-query';

const enum QueryKeys {
  USER_TOKEN = 'user-token',
}

export const useUserTokenFetchQuery = (orderId: string) => {
  const { data: userToken } = useQuery({
    queryKey: [QueryKeys.USER_TOKEN, orderId],
    queryFn: () => getUserToken(orderId),
    enabled: !!orderId,
  });
  return { userToken };
};
