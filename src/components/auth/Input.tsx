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
        const isPasswordConfirm = input.name === 'passwordConfirm' && path === '/auth/signup';

        if (input) {
          return (
            <div key={input.id}>
              {path === '/admin/store' && <label htmlFor={input.name}>{input.label}</label>}
              {path === '/auth/signup' && <label htmlFor={input.name}>{input.label}</label>}
              <input
                id={input.name}
                className={clsx(styles.input, {
                  [styles.inputError]: isPasswordConfirm && !isPasswordValid,
                })}
                name={input.name}
                value={value[key]}
                onChange={onChangeHandler}
                type={input.type}
                placeholder={input.placeholder}
                disabled={input.disabled}
                required
              />
              {isPasswordConfirm && (
                <span className={isPasswordValid ? styles.match : styles.error}>{passwordValidationMessage}</span>
              )}
            </div>
          );
        }
      })}
    </>
  );
};

export default Input;
