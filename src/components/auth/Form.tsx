import { useAuth } from '@/hooks/auth/useAuth';
import { useInput } from '@/hooks/auth/useInput';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';
import Input from './Input';
import styles from './styles/Auth.module.css';

const Form = () => {
  const path = useRouter().pathname;
  const { signup, login } = useAuth();
  const { value, onChangeHandler } = useInput({
    email: '',
    password: '',
    passwordConfirm: '',
    businessNumber: '',
  });

  const businessNumberCheckHandler = async () => {
    const data = { value: value.businessNumber };

    try {
      const res = await axios.post('/api/auth', data);
      return alert(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['title-wrapper']}>
        <h1 className={styles['title']}>편리함의 시작</h1>
        <h2 className={styles['sub-title']}>Magic Pos</h2>
      </div>
      <div className={styles['form-wrapper']}>
        <form className={styles['form']}>
          <Input name="email" value={value.email} onChangeHandler={onChangeHandler} type="text" placeholder="이메일" />
          <Input
            name="password"
            value={value.password}
            onChangeHandler={onChangeHandler}
            type="password"
            placeholder="비밀번호"
          />
          {path === '/auth/signup' && (
            <>
              <Input
                name="passwordCheck"
                value={value.passwordCheck}
                onChangeHandler={onChangeHandler}
                type="password"
                placeholder="비밀번호 확인"
              />
              <div className={styles['business-number-wrapper']}>
                <Input
                  name="businessNumber"
                  value={value.businessNumber}
                  onChangeHandler={onChangeHandler}
                  minLength={11}
                  maxLength={11}
                  type="number"
                  placeholder="사업자등록번호 (11자리)"
                />
                <Button className={styles['auth-button']} type="button" onClick={businessNumberCheckHandler}>
                  인증
                </Button>
              </div>
            </>
          )}
        </form>

        <div className={styles['bottom-wrapper']}>
          {path === '/auth/signup' ? (
            <>
              <Button type="button" onClick={() => signup(value)}>
                회원가입
              </Button>
              <Link className={styles['caption']} href="/auth/login">
                로그인하러 가기
              </Link>
            </>
          ) : (
            <>
              <Button type="button" onClick={() => login(value)}>
                로그인
              </Button>
              <div className={styles['caption-wrapper']}>
                <Link className={styles['caption']} href="#">
                  비밀번호를 잊으셨나요?
                </Link>
                <Link className={styles['caption']} href="/auth/signup">
                  회원가입하기
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
