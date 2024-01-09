import { useState } from 'react';

export const useInput = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    businessNumber: '',
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(prev => ({ ...prev, [name]: value }));
  };
  return { value, onChangeHandler };
};
