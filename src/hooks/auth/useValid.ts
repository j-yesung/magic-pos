import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MAX_BUSINESS_NUM_LENGTH = 10;

export const useValid = (value: Record<string, string>) => {
  const path = useRouter().pathname;
  const { email, password, passwordConfirm, businessNumber } = value;
  const [isValid, setIsValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const businessNumberRegex = /^\d{10}$/;

  useEffect(() => {
    if (path === '/auth/signup') {
      const isPasswordMatch = password !== '' && password === passwordConfirm;
      const areFieldsFilled =
        email.trim() !== '' && password.trim() !== '' && passwordConfirm.trim() !== '' && businessNumber.trim() !== '';

      // 이메일 에러 메세지 처리
      setEmailErrorMessage(email.trim() !== '' && !isEmailValid ? '올바른 이메일 형식이 아닙니다.' : '');

      /**
       * 비밀번호 에러 메세지 처리
       * 비밀번호가 비어 있지 않을 때만 에러 메시지를 설정합니다.
       */
      if (password.trim() !== '' && passwordConfirm.trim() !== '') {
        setPasswordErrorMessage(!isPasswordMatch ? '비밀번호가 일치하지 않습니다.' : '비밀번호가 일치합니다.');
      } else {
        setPasswordErrorMessage(''); // 비밀번호나 비밀번호 확인 값이 변경되었을 때 초기화
      }

      // 모든 필드가 유효한지 최종 검사하여 isValid 업데이트
      setIsValid(isEmailValid && isPasswordMatch && areFieldsFilled);
    } else {
      const areFieldsFilled = email.trim() !== '' && password.trim() !== '';

      setIsValid(isEmailValid && areFieldsFilled);
      setEmailErrorMessage(email.trim() !== '' && !isEmailValid ? '올바른 이메일 형식이 아닙니다.' : '');
    }
  }, [businessNumber, email, isEmailValid, password, passwordConfirm, path]);

  const isBusinessNumberValid =
    value.businessNumber.length === MAX_BUSINESS_NUM_LENGTH &&
    businessNumberRegex.test(value.businessNumber) &&
    isValid;

  return { isValid, emailErrorMessage, passwordErrorMessage, isBusinessNumberValid };
};
