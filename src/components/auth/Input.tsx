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
  placeholder: string;
  minLength?: number;
  maxLength?: number;
}

const Input = ({ value, onChangeHandler }: InputProps) => {
  const path = useRouter().pathname;
  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'text',
      placeholder: '이메일',
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: '비밀번호: 최소 8자리 이상 25자리 이하 (알파벳, 특수문자 포함)',
    },
    path === '/auth/signup' && {
      id: 3,
      name: 'passwordConfirm',
      type: 'password',
      placeholder: '비밀번호 확인',
    },
    path === '/auth/signup' && {
      id: 4,
      name: 'businessNumber',
      type: 'number',
      placeholder: '사업자등록번호 (11자리)',
      minLength: 11,
      maxLength: 11,
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
            />
          );
        }
      })}
    </>
  );
};

export default Input;
