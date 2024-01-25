import { setAddPlatForm } from '@/shared/store/platform';

interface InputType {
  name: string;
  type: string;
  placeholder: string;
  className: string;
}
const Input = (props: InputType) => {
  const { name, type, placeholder, className } = props;
  return <input type={type} className={className} name={name} placeholder={placeholder} onChange={setAddPlatForm} />;
};

export default Input;
