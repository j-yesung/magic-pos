export const emailInput = {
  id: 1,
  name: 'email',
  type: 'text',
  label: '사용하실 이메일과 비밀번호를 입력해 주세요.',
  placeholder: '이메일',
};

export const passwordInput = {
  id: 2,
  name: 'password',
  type: 'password',
  minLength: 8,
  maxLength: 16,
  placeholder: '비밀번호',
};

export const passwordSignUpInput = {
  id: 3,
  name: 'password',
  type: 'password',
  minLength: 8,
  maxLength: 16,
  placeholder: '비밀번호 (대소문자/특수문자 포함 8 ~ 16자리 영문)',
};

export const passwordConfirmInput = {
  id: 4,
  name: 'passwordConfirm',
  type: 'password',
  minLength: 8,
  maxLength: 16,
  placeholder: '비밀번호 확인',
};

export const businessNameInput = {
  id: 5,
  name: 'businessName',
  label: '상호명을 입력해 주세요.',
  type: 'text',
  placeholder: '상호명',
};

export const storeEmailInput = {
  id: 6,
  name: 'storeEmail',
  type: 'text',
  label: '이메일',
  disabled: true,
};

export const bnoNumberInput = {
  id: 7,
  name: 'bnoNumber',
  type: 'text',
  label: '사업자등록번호',
  disabled: true,
};

export const storeBusineesNameInput = {
  id: 8,
  name: 'storeName',
  type: 'text',
  label: '상호명',
  placeholder: '가게 이름',
  disabled: true,
};
