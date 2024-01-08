import { businessNumberCheckHandler, loginHandler, logoutHandler, signUpHandler } from '@/pages/api/auth/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const enum QUERY_KEY {
  LOGIN = 'login',
  SIGNUP = 'signup',
  LOGOUT = 'logout',
  BUSINESS = 'business',
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

  const logoutMutation = useMutation({
    mutationFn: logoutHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LOGOUT] });
      router.push('/');
    },
    onError: error => {
      console.error(error);
    },
  });

  const businessNumberCheckMutation = useMutation({
    mutationFn: businessNumberCheckHandler,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BUSINESS] });
      alert(data);
    },
    onError: error => {
      console.error(error);
    },
  });

  return {
    signup: signupMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    businessNumberCheck: businessNumberCheckMutation.mutate,
  };
};
