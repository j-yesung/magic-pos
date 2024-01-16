import {
  bnoNumberInput,
  businessNameInput,
  emailInput,
  passwordConfirmInput,
  passwordInput,
  passwordSignUpInput,
  storeBusineesNameInput,
  storeEmailInput,
} from '@/data/input-props';
import { useErrorMessage } from '@/hooks/auth/useErrorMessage';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import styles from './styles/Auth.module.css';

interface InputProps {
  value: Record<string, string>;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputType {
  id: number;
  name: string;
  type: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
}

const Input = ({ value, onChangeHandler }: InputProps) => {
  const path = useRouter().pathname;
  // const { passwordErrorMessage } = useValid(value);
  const { isPasswordValid, passwordValidationMessage } = useErrorMessage(value);

  const inputOptions: Record<string, InputType[]> = {
    '/auth/login': [emailInput, passwordInput],
    '/auth/signup': [emailInput, passwordSignUpInput, passwordConfirmInput, businessNameInput],
    '/auth/findPassword': [emailInput],
    '/auth/reset': [passwordInput, passwordConfirmInput],
    '/admin/store': [storeEmailInput, bnoNumberInput, storeBusineesNameInput],
  };

  const inputs = inputOptions[path];

  return (
    <>
      {inputs.map((input: InputType) => {
        const key = input.name;
        const isPasswordConfirm = input.name === 'passwordConfirm';
        const isSuccess = passwordErrorMessage === '비밀번호가 일치합니다.' && isPasswordConfirm;

        if (input) {
          return (
            <div key={input.id}>
              {path === '/admin/store' && <label htmlFor={input.name}>{input.label}</label>}
              {path === '/auth/signup' && <label htmlFor={input.name}>{input.label}</label>}
              <input
                id={input.name}
                className={clsx(styles.input, {
                  [styles.inputError]: !isSuccess && isPasswordConfirm && passwordErrorMessage !== '',
                })}
                name={input.name}
                value={value[key]}
                onChange={onChangeHandler}
                type={input.type}
                placeholder={input.placeholder}
                disabled={input.disabled}
                required
              />
              {/* 로그인 & 회원가입 둘 다 적용 */}
              {input.name === 'passwordConfirm' && (
                <span className={isSuccess ? styles.match : styles.error}>{passwordErrorMessage || ''}</span>
              )}
            </div>
          );
        }
      })}
    </>
  );
};

export default Input;
