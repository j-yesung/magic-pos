import { useAuth } from '@/hooks/auth/useAuth';
import { useInput } from '@/hooks/auth/useInput';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Button from './Button';
import Input from './Input';

/**
 * @description 유효성 검사해야 합니다.
 */
const Form = () => {
  const path = useRouter().pathname;
  const { signup, login } = useAuth();
  const { value, onChange } = useInput({
    email: '',
    password: '',
    passwordConfirm: '',
    businessNumber: '',
  });

  const businessNumberCheckHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { value: value.businessNumber };

    try {
      const res = await axios.post('/api/auth', data);
      return alert(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const clickSignuUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signup(value);
  };
  const clickLoginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-2xl font-bold mb-5">편리함의 시작, Magic Pos</h1>
      <div className="p-6 w-1/4">
        <form className="flex flex-col gap-5">
          <Input name="email" value={value.email} onChange={onChange} type="text" placeholder="이메일" />
          <Input name="password" value={value.password} onChange={onChange} type="password" placeholder="비밀번호" />
          {path === '/auth/signup' && (
            <Fragment>
              <Input
                name="passwordCheck"
                value={value.passwordCheck}
                onChange={onChange}
                type="password"
                placeholder="비밀번호 확인"
              />
              <div>
                <Input
                  name="businessNumber"
                  value={value.businessNumber}
                  onChange={onChange}
                  minLength={11}
                  maxLength={11}
                  type="number"
                  placeholder="사업자등록번호 (11자리)"
                />
                <Button type="button" onClick={businessNumberCheckHandler}>
                  인증
                </Button>
              </div>
            </Fragment>
          )}
        </form>

        <div className="flex flex-col">
          {path === '/auth/signup' ? (
            <Fragment>
              <Button type="submit" onClick={clickSignuUpHandler}>
                회원가입
              </Button>
              <Link className="" href="/auth/login">
                로그인하러 가기
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Button type="button" onClick={clickLoginHandler}>
                로그인
              </Button>
              <div className="flex justify-between text-xs text-center">
                <Link href="#">비밀번호를 잊으셨나요?</Link>
                <Link className="" href="/auth/signup">
                  회원가입하러 가기
                </Link>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
