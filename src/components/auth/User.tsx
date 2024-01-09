import { useRouter } from 'next/router';
import SignForm from './SignForm';

const User = () => {
  const path = useRouter().pathname;

  const LOGIN_DATA = {
    url: '/auth/signup',
    subName: '비밀번호를 잊으셨나요?',
    caption: '아직 회원이 아니신가요? 회원가입하러 가기',
    buttonName: '로그인',
  };
  const SIGNUP_DATA = {
    url: '/auth/login',
    caption: '이미 가입을 하셨나요? 로그인하러 가기',
    buttonName: '회원가입',
  };

  return (
    <>
      <SignForm data={path === '/auth/login' ? LOGIN_DATA : SIGNUP_DATA} />
    </>
  );
};

export default User;
