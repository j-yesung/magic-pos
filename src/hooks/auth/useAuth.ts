import { businessNumberCheckHandler } from '@/server/api/external/business';
import {
  getStoreId,
  getUserSession,
  loginHandler,
  logoutHandler,
  resetPasswordHandler,
  signUpHandler,
  updatePasswordHandler,
} from '@/server/api/supabase/auth';
import { getStore } from '@/server/api/supabase/store';
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
  const { setSession, setStoreId, setStoreName, setStoreBno } = useAuthStore();

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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LOGIN] });
      const auth = await getUserSession();
      const storeId = await getStoreId();
      const store = await getStore(auth.session?.user.id || '');
      const storeName = store && store[0]?.business_name;
      const storeBno = store && store[0]?.business_number;
      setSession(auth.session);
      setStoreBno(storeBno!);
      setStoreName(storeName!);
      storeId.length !== 0 ? setStoreId(storeId[0].id) : setStoreId(null!);
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
      useAuthStore.persist.clearStorage();
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
    status: businessNumberCheckMutation,
  };
};
