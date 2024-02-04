import { HOME_PATH, LOGIN_PATH, SIGNUP_SUCCESS_PATH } from '@/data/url-list';
import { businessNumberCheckHandler } from '@/server/api/external/business';
import {
  checkEmailHandler,
  getStoreId,
  getUserSession,
  loginHandler,
  logoutHandler,
  resetPasswordHandler,
  signUpHandler,
  updatePasswordHandler,
} from '@/server/api/supabase/auth';
import { getStore } from '@/server/api/supabase/store';
import useAuthState, { setSession, setStoreBno, setStoreId, setStoreName } from '@/shared/store/session';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useModal } from '../../service/ui/useModal';
import useToast from '../../service/ui/useToast';

const enum QUERY_KEY {
  LOGIN = 'login',
  SIGNUP = 'signup',
  LOGOUT = 'logout',
  BUSINESS = 'business',
  UPDATE_PASSWORD = 'updatePassword',
  SESSION = 'session',
  CHECKED = 'checked',
}

export const useAuthSetQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const { MagicModal } = useModal();

  const signupMutation = useMutation({
    mutationFn: signUpHandler,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SIGNUP] });
      router.push(SIGNUP_SUCCESS_PATH);
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
      const userSession = auth.session;
      const storeName = store && store[0]?.business_name;
      const storeBno = store && store[0]?.business_number;
      setSession(userSession);
      setStoreBno(storeBno);
      setStoreName(storeName);
      storeId.length !== 0 ? setStoreId(storeId[0].id) : setStoreId(null!);
      router.push(HOME_PATH);
      toast(`${storeName} 사장님 반갑습니다.`, {
        type: 'success',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });
    },
    onError: () => {
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
      useAuthState.persist.clearStorage();
      router.push(HOME_PATH);
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
      router.push(LOGIN_PATH);
    },
    onError: error => {
      console.error(error);
    },
  });

  const getUserSessionMutation = useMutation({
    mutationFn: getUserSession,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SESSION] });
      setSession(data.session);
    },
    onError: error => {
      console.error(error);
    },
  });

  const checkEmailMutation = useMutation({
    mutationFn: checkEmailHandler,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CHECKED] });
      if (data) {
        toast('이미 가입된 이메일입니다.', {
          type: 'danger',
          position: 'top-center',
          showCloseButton: false,
          autoClose: 2000,
        });
      }
      return data;
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
    checkEmail: checkEmailMutation.mutateAsync,
    message,
  };
};
