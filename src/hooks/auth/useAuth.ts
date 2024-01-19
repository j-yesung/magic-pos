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
import { useState } from 'react';
import { useModal } from '../modal/useModal';
import useToast from '../toast/useToast';

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
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const { MagicModal } = useModal();

  const signupMutation = useMutation({
    mutationFn: signUpHandler,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SIGNUP] });
      router.push('/auth/success');
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
      toast(`${storeName} 사장님 반갑습니다.`, {
        type: 'success',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });
    },
    onError: error => {
      console.error(error);
      toast('이메일 또는 비밀번호가 일치하지 않습니다.', {
        type: 'danger',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LOGOUT] });
      setSession(null);
      useAuthStore.persist.clearStorage();
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
      setMessage(data);
    },
    onError: error => {
      console.error(error);
    },
  });

  const sendResetPasswordEmailMutation = useMutation({
    mutationFn: resetPasswordHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LOGIN] });
      MagicModal.alert({ content: '이메일이 전송되었습니다.\n확인해 주세요.', showButton: false, timeout: 2000 });
    },
    onError: error => {
      console.error(error);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: updatePasswordHandler,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UPDATE_PASSWORD] });
      if (data) {
        toast('비밀번호 변경이 완료되었습니다.', {
          type: 'success',
          position: 'top-center',
          showCloseButton: false,
          autoClose: 2000,
        });
      }
      router.push('/auth/login');
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
    message,
  };
};
