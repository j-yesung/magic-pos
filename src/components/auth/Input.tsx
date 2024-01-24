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
import { useErrorMessage } from '@/hooks/service/auth/useErrorMessage';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FaCheck } from 'react-icons/fa6';
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
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
}

const Input = ({ value, onChangeHandler, onKeyDownHandler }: InputProps) => {
  const path = useRouter().pathname;
  const { isPasswordValid, passwordValidationMessage } = useErrorMessage(value);

  const inputOptions: Record<string, InputType[]> = {
    '/auth/login': [emailInput, passwordInput],
    '/auth/signup': [emailInput, passwordSignUpInput, passwordConfirmInput, businessNameInput],
    '/auth/findPassword': [emailInput],
    '/auth/reset': [passwordInput, passwordConfirmInput],
    '/admin/store': [storeEmailInput, storeBusineesNameInput, bnoNumberInput],
  };

  const inputs = inputOptions[path];
  const isStoreClassName = path === '/admin/store' ? styles.storeInputWrapper : '';

  return (
    <>
      {inputs.map((input: InputType) => {
        const key = input.name;
        const isPasswordConfirm = input.name === 'passwordConfirm' && path === '/auth/signup';

        if (input) {
          return (
            <div key={input.id} className={isStoreClassName}>
              {path === '/admin/store' && <label htmlFor={input.name}>{input.label}</label>}
              {path === '/auth/signup' && <label htmlFor={input.name}>{input.label}</label>}
              <input
                id={input.name}
                className={clsx(styles.input, {
                  [styles.inputError]: isPasswordConfirm && !isPasswordValid && value['passwordConfirm'],
                })}
                name={input.name}
                value={value[key]}
                onChange={onChangeHandler}
                type={input.type}
                minLength={input.minLength}
                maxLength={input.maxLength}
                placeholder={input.placeholder}
                onKeyDown={input.name === 'password' && path === '/auth/login' ? onKeyDownHandler : undefined}
                disabled={input.disabled}
                required
              />
              <div className={styles.pwCheckIcon}>
                {isPasswordConfirm && value['password'] && isPasswordValid ? <FaCheck /> : null}
                {input.name === 'passwordConfirm' && (
                  <span
                    className={isPasswordConfirm && value['password'] && isPasswordValid ? styles.match : styles.error}
                  >
                    {isPasswordConfirm && value['password'] ? passwordValidationMessage : <>&nbsp;</>}
                  </span>
                )}
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Input;
