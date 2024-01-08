import { loginHandler, signUpHandler } from '@/pages/auth/supabase-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const enum QUERY_KEY {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: signUpHandler,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SIGNUP] });
      router.push('/auth/login');
    },
    onError: error => {
      console.error(error);
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LOGIN] });
      router.push('/');
    },
    onError: error => {
      console.error(error);
    },
  });

  return { signup: signupMutation.mutate, login: loginMutation.mutate };
};
