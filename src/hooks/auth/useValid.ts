import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MAX_BUSINESS_NUM_LENGTH = 10;

export const useValid = (value: Record<string, string>) => {
  const path = useRouter().pathname;
  const { email, password, passwordConfirm, businessNumber } = value;
  const [isValid, setIsValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [bnoErrorMessage, setBnoErrorMessage] = useState('');
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // 사업자 번호 유효성 검사를 바로 실행하지 않고, useEffect 내에서 상태를 설정하도록 변경
  const [isBnoValid, setIsBnoValid] = useState(false);

  const isBusinessNumberValid = value.businessNumber.length === MAX_BUSINESS_NUM_LENGTH;

  useEffect(() => {
    // 사업자 번호 유효성 검사 로직을 useEffect로 이동
    const businessNumberRegex = /^\d{10}$/;
    const currentIsBnoValid = businessNumberRegex.test(businessNumber);
    setIsBnoValid(currentIsBnoValid);

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

      // 사업자 번호 에러 메세지 처리
      setBnoErrorMessage(businessNumber.trim() !== '' && !isBnoValid ? '올바른 사업자 번호 형식이 아닙니다.' : '');

      // 모든 필드가 유효한지 최종 검사하여 isValid 업데이트
      setIsValid(isEmailValid && isPasswordMatch && currentIsBnoValid && areFieldsFilled);
    } else {
      const areFieldsFilled = email.trim() !== '' && password.trim() !== '';

      setIsValid(isEmailValid && areFieldsFilled);
      setEmailErrorMessage(email.trim() !== '' && !isEmailValid ? '올바른 이메일 형식이 아닙니다.' : '');
    }
  }, [businessNumber, email, isBnoValid, isEmailValid, isValid, password, passwordConfirm, path]);

  return { isValid, emailErrorMessage, passwordErrorMessage, bnoErrorMessage, isBusinessNumberValid };
};
