import { useAuth } from '@/hooks/auth/useAuth';
import { useInput } from '@/hooks/auth/useInput';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * @description 유효성 검사해야 합니다.
 */
const Form = () => {
  const path = useRouter().pathname;
  const { signup } = useAuth();
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
      const message =
        res.status === 200 && res.data.data[0].tax_type_cd === '01' ? '인증되었습니다.' : res.data.data[0].tax_type;
      return alert(message);
    } catch (error) {
      console.error(error);
    }
  };

  const signupHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signup(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-2xl font-bold mb-5">파워레인조 희대의 작품 Magic-Pos</h1>

      {path === '/auth/login' ? (
        <div className="p-6 w-1/4">
          <form className="flex flex-col gap-5">
            <input
              className="p-1 border-zinc-300 border-2 rounded-md outline-none focus:border-purple-500"
              type="text"
              name="email"
              value={value.email}
              onChange={onChange}
              placeholder="이메일"
            />
            <input
              className="p-1 border-zinc-300 border-2 rounded-md outline-none focus:border-purple-500"
              type="password"
              name="password"
              value={value.password}
              onChange={onChange}
              placeholder="비밀번호"
            />
          </form>
          <div className="flex flex-col">
            <button className="p-3 mt-5 mb-5 rounded-md text-white bg-purple-500 hover:bg-purple-600" type="submit">
              로그인
            </button>
            <div className="flex justify-between text-xs text-center">
              <Link href="#">비밀번호를 잊으셨나요?</Link>
              <Link className="" href="/auth/signup">
                회원가입하러 가기
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 w-1/4">
          <form className="flex flex-col gap-5">
            <input
              className="p-1 border-zinc-300 border-2 rounded-md outline-none focus:border-purple-500"
              type="text"
              name="email"
              value={value.email}
              onChange={onChange}
              placeholder="이메일"
            />
            <input
              className="p-1 border-zinc-300 border-2 rounded-md outline-none focus:border-purple-500"
              type="password"
              name="password"
              value={value.password}
              onChange={onChange}
              placeholder="비밀번호"
            />
            <input
              className="p-1 border-zinc-300 border-2 rounded-md outline-none focus:border-purple-500"
              type="password"
              name="passwordCheck"
              onChange={onChange}
              placeholder="비밀번호 확인"
            />
            <div className="flex w-full">
              <input
                className="p-1 w-3/4 border-zinc-300 border-2 rounded-md outline-none focus:border-purple-500"
                type="number"
                name="businessNumber"
                value={value.businessNumber}
                minLength={11}
                maxLength={11}
                placeholder="사업자등록번호 (11자리)"
                onChange={onChange}
              />
              <button
                className="w-1/4 p-2 ml-2 rounded-md text-white bg-purple-500 hover:bg-purple-600"
                type="button"
                onClick={businessNumberCheckHandler}
              >
                인증
              </button>
            </div>
          </form>
          <div className="flex flex-col">
            <button
              className="p-3 mt-5 mb-5 rounded-md text-white bg-purple-500 hover:bg-purple-600"
              type="submit"
              onClick={signupHandler}
            >
              회원가입
            </button>
            <Link className="text-xs text-right" href="/auth/login">
              로그인하러 가기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
