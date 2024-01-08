import { signUp } from '@/pages/auth/supabase-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const enum QUERY_KEY {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const signupMutation = useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SIGNUP] });
      console.log('success');
    },
  });

  return { signup: signupMutation.mutate };
};
