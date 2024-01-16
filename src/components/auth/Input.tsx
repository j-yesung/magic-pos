import { useValid } from '@/hooks/auth/useValid';
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
  const { passwordErrorMessage } = useValid(value);

  const emailInput = {
    id: 1,
    name: 'email',
    type: 'text',
    label: '사용하실 이메일과 비밀번호를 입력해 주세요.',
    placeholder: '이메일',
  };

  const passwordInput = {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: '비밀번호',
  };

  const passwordSignUpInput = {
    id: 3,
    name: 'password',
    type: 'password',
    placeholder: '비밀번호 (대소문자/특수문자 포함 8~16자리 영문)',
  };

  const passwordConfirmInput = {
    id: 4,
    name: 'passwordConfirm',
    type: 'password',
    placeholder: '비밀번호 확인',
  };

  const businessNameInput = {
    id: 5,
    name: 'businessName',
    label: '사업자등록번호',
    type: 'text',
    placeholder: '상호명',
  };

  const storeEmailInput = {
    id: 6,
    name: 'storeEmail',
    type: 'text',
    label: '이메일',
    disabled: true,
  };

  const bnoNumberInput = {
    id: 7,
    name: 'bnoNumber',
    type: 'text',
    label: '사업자등록번호',
    disabled: true,
  };

  const storeBusineesNameInput = {
    id: 8,
    name: 'storeName',
    type: 'text',
    label: '상호명',
    placeholder: '가게 이름',
    disabled: true,
  };

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
        const key = input.name as keyof typeof value;
        const isPasswordConfirm = input.name === 'passwordConfirm';
        const isSuccess = passwordErrorMessage === '비밀번호가 일치합니다.' && isPasswordConfirm;

        if (input) {
          return (
            <div key={input.id}>
              {path === '/admin/store' && <label htmlFor={input.name}>{input.label}</label>}
              {path === '/auth/signup' && <label htmlFor={input.name}>{input.label}</label>}
              <input
                id={input.name}
                className={
                  isSuccess
                    ? styles.input
                    : isPasswordConfirm && passwordErrorMessage !== ''
                      ? `${styles.input} ${styles.inputError}`
                      : styles.input
                }
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
