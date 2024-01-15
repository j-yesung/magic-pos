import { useState } from 'react';

type InputValues = Record<string, string>;

export const useInput = (initialValue: InputValues) => {
  const [value, setValue] = useState(initialValue);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(prev => ({ ...prev, [name]: value }));
  };
  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^[0-9]+$/.test(e.key) && e.key.length === 1) {
      return e.preventDefault();
    }
  };

  return { value, changeHandler, keyDownHandler };
};
