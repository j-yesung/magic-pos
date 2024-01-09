import { useRouter } from 'next/router';

type Values = Record<string, string>;

const MAX_BUSINESS_NUM_LENGTH = 11;

export const useValid = (value: Values) => {
  const path = useRouter().pathname;
  const { email, password, passwordConfirm, businessNumber } = value;

  const validateCheck = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/g;
    const businessNumberRegex = /^\d{11}$/g;

    if (path === '/auth/login') {
      if (!email || !password) {
        return alert('필수 입력값을 입력해 주세요.');
      }
    }

    if (path === '/auth/signup') {
      if (!email || !password || !passwordConfirm || !businessNumber) {
        return alert('필수 입력값을 입력해 주세요.');
      }
    }

    if (path === '/auth/findPassword') {
      if (!email) {
        return alert('필수 입력값을 입력해 주세요.');
      }
    }

    if (!emailRegex.test(email)) {
      return alert('이메일 형식이 올바르지 않습니다.');
    }
    // if (!passwordRegex.test(password)) {
    //   return alert('비밀번호 형식이 올바르지 않습니다.');
    // }

    if (path === '/auth/signup' || path === '/auth/reset') {
      if (password !== passwordConfirm) {
        return alert('비밀번호가 일치하지 않습니다.');
      }
      if (!businessNumberRegex.test(businessNumber)) {
        return alert('사업자등록번호 형식이 올바르지 않습니다.');
      }
    }

    return true;
  };

  const isBusinessNumberValid = value.businessNumber.length === MAX_BUSINESS_NUM_LENGTH;

  return { validateCheck, isBusinessNumberValid };
};
