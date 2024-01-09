import { useRouter } from 'next/router';
import styles from './styles/Auth.module.css';

interface InputProps {
  value: Record<string, string>;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDownHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface InputType {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChangeHandler, onKeyDownHandler }: InputProps) => {
  const path = useRouter().pathname;
  const inputs = [
    path === '/auth/login' || path === '/auth/signup' || path === '/auth/findPassword'
      ? {
          id: 1,
          name: 'email',
          type: 'text',
          placeholder: '이메일',
        }
      : false,
    path === '/auth/login' || path === '/auth/signup' || path === '/auth/reset'
      ? {
          id: 2,
          name: 'password',
          type: 'password',
          placeholder: '비밀번호: 최소 8자리 이상 25자리 이하 (알파벳, 특수문자 포함)',
        }
      : false,
    path === '/auth/signup' || path === '/auth/reset'
      ? {
          id: 3,
          name: 'passwordConfirm',
          type: 'password',
          placeholder: '비밀번호 확인',
        }
      : false,
    path === '/auth/signup' && {
      id: 4,
      name: 'businessNumber',
      type: 'text',
      placeholder: '사업자등록번호 (11자리)',
      minLength: 11,
      maxLength: 11,
      onKeyDown: onKeyDownHandler,
    },
  ] as InputType[];

  return (
    <>
      {inputs.map((input: InputType) => {
        const key = input.name as keyof typeof value;
        if (input) {
          return (
            <input
              key={input.id}
              className={styles['input']}
              name={input.name}
              value={value[key]}
              onChange={onChangeHandler}
              type={input.type}
              placeholder={input.placeholder}
              minLength={input.minLength}
              maxLength={input.maxLength}
              onKeyDown={input.onKeyDown}
              required
            />
          );
        }
      })}
    </>
  );
};

export default Input;
