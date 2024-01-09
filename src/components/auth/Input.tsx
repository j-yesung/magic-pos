import { useRouter } from 'next/router';
import styles from './styles/Auth.module.css';

interface InputProps {
  value: Record<string, string>;
  onChangeHandler?: () => void;
  onKeyDownHandler?: () => void;
}

interface InputType {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  onKeyDown?: () => void;
}

const Input = ({ value, onChangeHandler, onKeyDownHandler }: InputProps) => {
  const path = useRouter().pathname as string;

  const emailInput = {
    id: 1,
    name: 'email',
    type: 'text',
    placeholder: '이메일',
  };

  const passwordInput = {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: '비밀번호: 최소 8자리 이상 25자리 이하 (알파벳, 특수문자 포함)',
  };

  const passwordSignUpInput = {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: '비밀번호',
  };

  const passwordConfirmInput = {
    id: 3,
    name: 'passwordConfirm',
    type: 'password',
    placeholder: '비밀번호 확인',
  };

  const businessNumberInput = {
    id: 4,
    name: 'businessNumber',
    type: 'text',
    placeholder: '사업자등록번호 (11자리)',
    minLength: 11,
    maxLength: 11,
    onKeyDown: onKeyDownHandler,
  };

  const inputOptions: Record<string, InputType[]> = {
    '/auth/login': [emailInput, passwordInput],
    '/auth/signup': [emailInput, passwordSignUpInput, passwordConfirmInput, businessNumberInput],
    '/auth/findPassword': [emailInput],
    '/auth/reset': [passwordInput, passwordConfirmInput],
  };

  const inputs = inputOptions[path];

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
