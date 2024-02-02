import useAuthState from '@/shared/store/session';
import { useRouter } from 'next/router';
import AuthForm from './AuthForm';
import { FIND_PASSWORD_DATA, LOGIN_DATA, SIGNUP_DATA, SIGNUP_SUCCESS_DATA, UPDATE_PASSWORD_DATA } from './auth';

type AuthObjectType = Record<string, string>;

const User = () => {
  const session = useAuthState(state => state.session);
  const path = useRouter().pathname;
  const router = useRouter();

  if (session) router.push('/');

  const AuthData: Record<string, AuthObjectType> = {
    '/auth/login': LOGIN_DATA,
    '/auth/signup': SIGNUP_DATA,
    '/auth/findPassword': FIND_PASSWORD_DATA,
    '/auth/reset': UPDATE_PASSWORD_DATA,
    '/auth/success': SIGNUP_SUCCESS_DATA,
  };

  return <AuthForm data={AuthData[path]} />;
};

export default User;
