import clsx from 'clsx';
import styles from '../styles/Auth.module.css';

const Input = (props: InputProps) => {
  const { label, type, placeholder, register, name, validation, error, isSuccessful, maxLength, minLength } = props;
  const inputStyle = name === 'businessNumber' ? styles.otherStyle : styles.defaultStyle;

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={clsx(inputStyle, { [styles.inputError]: error }, { [styles.inputSuccess]: isSuccessful })}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={isSuccessful}
        {...(register && register(name, validation))}
      />
    </>
  );
};

export default Input;
