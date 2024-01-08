import styles from './styles/Auth.module.css';

type InputProps = {
  className?: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
  type: string;
  placeholder: string;
};

const Input = ({ name, value, type, onChange, placeholder }: InputProps) => {
  return (
    <input
      className={styles['input']}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
