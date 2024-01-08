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
      className="p-1 border-zinc-300 border-2 rounded-md outline-none focus:border-purple-500"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
