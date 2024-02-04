import { LOGIN_PATH } from '@/data/url-list';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

const Input = (props: InputProps) => {
  const {
    id,
    label,
    type,
    placeholder,
    register,
    name,
    validation,
    error,
    isSuccessful,
    maxLength,
    minLength,
    keyDownLoginHandler,
  } = props;
  const path = useRouter().pathname;
  const inputStyle = name === 'businessNumber' ? styles.otherStyle : styles.defaultStyle;
  const isKeyDown = (name === 'password' || name === 'email') && path === LOGIN_PATH;

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={clsx(inputStyle, { [styles.inputError]: error }, { [styles.inputSuccess]: isSuccessful })}
        id={id}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={isSuccessful}
        onKeyDown={isKeyDown ? keyDownLoginHandler : undefined}
        {...(register && register(name, validation))}
      />
    </>
  );
};

export default Input;
