import { useState } from 'react';

type values = Record<string, string>;

export const useInput = (initialValue: values = {}) => {
  const [value, setValue] = useState(initialValue);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(prev => ({ ...prev, [name]: value }));
  };
  return { value, onChangeHandler };
};
