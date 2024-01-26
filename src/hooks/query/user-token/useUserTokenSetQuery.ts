import { useMutation } from '@tanstack/react-query';
import { addUserToken } from '@/server/api/supabase/user-token';

export const useUserTokenSetQuery = () => {
  const addUserTokenQuery = useMutation({
    mutationFn: addUserToken,
    onError: error => {
      console.error(error);
    },
  });

  return { addUserToken: addUserTokenQuery.mutate };
};
