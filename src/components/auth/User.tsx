import { useRouter } from 'next/router';
import AuthForm from './AuthForm';

type AuthObjectType = Record<string, string>;

const User = () => {
  const path = useRouter().pathname;

  const LOGIN_DATA = {
    url: '/auth/signup',
    subUrl: '/auth/findPassword',
    title: '편리함의 시작',
    subTitle: 'Magic Pos',
    subName: '비밀번호를 잊으셨나요?',
    caption: '아직 회원이 아니신가요? 회원가입하러 가기',
    buttonName: '로그인',
  };
  const SIGNUP_DATA = {
    url: '/auth/login',
    title: '편리함의 시작',
    subTitle: 'Magic Pos',
    caption: '이미 가입을 하셨나요? 로그인하러 가기',
    buttonName: '회원가입',
    subButtonName: '사업자등록번호 인증',
  };
  const FIND_PASSWORD_DATA = {
    title: '편리함의 시작',
    subTitle: 'Magic Pos',
    description: '가입하신 이메일을 입력해 주세요.',
    buttonName: '링크 전송',
  };
  const UPDATE_PASSWORD_DATA = {
    title: '편리함의 시작',
    subTitle: 'Magic Pos',
    buttonName: '비밀번호 변경',
    description: '새로운 비밀번호를 입력해 주세요.',
  };

  const AuthData: Record<string, AuthObjectType> = {
    '/auth/login': LOGIN_DATA,
    '/auth/signup': SIGNUP_DATA,
    '/auth/findPassword': FIND_PASSWORD_DATA,
    '/auth/reset': UPDATE_PASSWORD_DATA,
  };

  return <AuthForm data={AuthData[path]} />;
};

export default User;
