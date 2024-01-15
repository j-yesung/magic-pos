import { useRouter } from 'next/router';
import { Fragment } from 'react';
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
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChangeHandler, onKeyDownHandler }: InputProps) => {
  const path = useRouter().pathname;

  const emailInput = {
    id: 1,
    name: 'email',
    type: 'text',
    label: '이메일',
    placeholder: '이메일',
  };

  const passwordInput = {
    id: 2,
    name: 'password',
    type: 'password',
    label: '비밀번호',
    placeholder: '비밀번호',
  };

  const passwordSignUpInput = {
    id: 3,
    name: 'password',
    type: 'password',
    label: '비밀번호',
    placeholder: '비밀번호: 최소 8자리 이상 25자리 이하 (알파벳, 특수문자 포함)',
  };

  const passwordConfirmInput = {
    id: 4,
    name: 'passwordConfirm',
    type: 'password',
    label: '비밀번호 확인',
    placeholder: '비밀번호 확인',
  };

  const businessNumberInput = {
    id: 5,
    name: 'businessNumber',
    type: 'text',
    label: '사업자등록번호',
    placeholder: '사업자등록번호 (10자리)',
    minLength: 10,
    maxLength: 10,
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
            <Fragment key={input.id}>
              <label htmlFor={input.name}>{input.label}</label>
              <input
                id={input.name}
                className={styles['input']}
                name={input.name}
                value={value[key]}
                onChange={onChangeHandler}
                type={input.type}
                placeholder={input.placeholder}
                minLength={input.minLength}
                maxLength={input.maxLength}
                onKeyDown={input.onKeyDown}
                disabled={input.disabled}
                required
              />
            </Fragment>
          );
        }
      })}
    </>
  );
};

export default Input;
