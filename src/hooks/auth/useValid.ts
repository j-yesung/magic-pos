import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MAX_BUSINESS_NUM_LENGTH = 10;

export const useValid = (value: Record<string, string>) => {
  const path = useRouter().pathname;
  const { email, password, passwordConfirm, businessNumber } = value;
  const [isValid, setIsValid] = useState(false);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const businessNumberRegex = /^\d{10}$/;

  useEffect(() => {
    if (path === '/auth/signup') {
      const isPasswordMatch = password !== '' && password === passwordConfirm;
      const areFieldsFilled =
        email.trim() !== '' && password.trim() !== '' && passwordConfirm.trim() !== '' && businessNumber.trim() !== '';

      setIsValid(isEmailValid && isPasswordMatch && areFieldsFilled);
    } else {
      const areFieldsFilled = email.trim() !== '' && password.trim() !== '';

      setIsValid(isEmailValid && areFieldsFilled);
    }
  }, [businessNumber, email, isEmailValid, password, passwordConfirm, path]);

  const isBusinessNumberValid =
    businessNumber?.length === MAX_BUSINESS_NUM_LENGTH && businessNumberRegex.test(businessNumber) && isValid;

  return { isValid, isBusinessNumberValid };
};
