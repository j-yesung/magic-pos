import styles from './styles/Auth.module.css';

interface InputProps {
  className?: string;
  name: string;
  value: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
  type: string;
  placeholder: string;
}

const Input = ({ name, value, type, onChangeHandler, placeholder }: InputProps) => {
  return (
    <input
      className={styles['input']}
      type={type}
      name={name}
      value={value}
      onChange={onChangeHandler}
      placeholder={placeholder}
    />
  );
};

export default Input;
