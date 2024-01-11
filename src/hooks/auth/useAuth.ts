import { businessNumberCheckHandler } from '@/server/api/external/business';
import {
  getUserSession,
  loginHandler,
  logoutHandler,
  resetPasswordHandler,
  signUpHandler,
  updatePasswordHandler,
} from '@/server/api/supabase/auth';
import useAuthStore from '@/shared/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const enum QUERY_KEY {
  LOGIN = 'login',
  SIGNUP = 'signup',
  LOGOUT = 'logout',
  BUSINESS = 'business',
  UPDATE_PASSWORD = 'updatePassword',
  SESSION = 'session',
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setSession } = useAuthStore();
  console.log('렌더링');

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
      setSession(null);
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

  const sendResetPasswordEmailMutation = useMutation({
    mutationFn: resetPasswordHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LOGIN] });
      router.push('/auth/reset');
    },
    onError: error => {
      console.error(error);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: updatePasswordHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UPDATE_PASSWORD] });
      router.push('/');
    },
    onError: error => {
      console.error(error);
    },
  });

  const getUserSessionMutation = useMutation({
    mutationFn: getUserSession,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SESSION] });
      setSession(data);
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
    updatePassword: updatePasswordMutation.mutate,
    sendResetPasswordEmail: sendResetPasswordEmailMutation.mutate,
    getUserSession: getUserSessionMutation.mutate,
  };
};
