type Inputs = Record<string, string>;

interface InputProps {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  register?: UseFormRegister<Inputs>;
  name: keyof Inputs;
  validation?: RegisterOptions;
  error?: FieldError;
  isSuccessful?: boolean;
  keyDownLoginHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
