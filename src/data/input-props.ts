export const signupInput = [
  {
    unique: 1,
    id: 'email',
    label: '사용하실 이메일과 비밀번호를 입력해 주세요.',
    type: 'text',
    placeholder: '이메일',
    name: 'email',
    validation: {
      required: '이메일은 필수 항목입니다.',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '이메일 형식에 맞지 않습니다.',
      },
    },
  },
  {
    unique: 2,
    id: 'password',
    type: 'password',
    placeholder: '비밀번호',
    name: 'password',
    minLenght: 8,
    maxLength: 16,
    validation: {
      required: '비밀번호는 필수 항목입니다.',
      minLength: {
        value: 6,
        message: '비밀번호는 최소 8자리 이상이어야 합니다.',
      },
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/g,
        message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
      },
    },
  },
  {
    unique: 3,
    id: 'confirmPassword',
    type: 'password',
    placeholder: '비밀번호 확인',
    minLegth: 8,
    maxLength: 16,
    name: 'confirmPassword',
    validation: {},
    validateFunc: (password: string) => ({
      validate: (value: string) => value === password || '비밀번호가 일치하지 않습니다.',
    }),
  },
  {
    unique: 4,
    id: 'storeName',
    label: '상호명을 입력해 주세요.',
    type: 'text',
    placeholder: '상호명',
    name: 'storeName',
    validation: {},
  },
  {
    unique: 5,
    id: 'businessNumber',
    label: '사업자등록번호를 인증해 주세요.',
    type: 'text',
    placeholder: '사업자등록번호',
    name: 'businessNumber',
    minLength: 10,
    maxLength: 10,
    validation: {
      pattern: /^\d{10}$/,
    },
  },
];

export const loginInput = [
  {
    unique: 1,
    id: 'email',
    type: 'text',
    placeholder: '이메일',
    name: 'email',
    validation: {},
  },
  {
    unique: 2,
    id: 'password',
    type: 'password',
    placeholder: '비밀번호',
    minLegth: 8,
    maxLength: 16,
    name: 'password',
    validation: {},
  },
];

export const resetPasswordInput = [
  {
    unique: 1,
    id: 'password',
    type: 'password',
    placeholder: '비밀번호',
    minLegth: 8,
    maxLength: 16,
    name: 'password',
    validation: {},
  },
  {
    unique: 2,
    id: 'confirmPassword',
    type: 'password',
    placeholder: '비밀번호 확인',
    minLegth: 8,
    maxLength: 16,
    name: 'confirmPassword',
    validation: {},
    validateFunc: (password: string) => ({
      validate: (value: string) => value === password || '비밀번호가 일치하지 않습니다.',
    }),
  },
];

export const sendEmailInput = [
  {
    unique: 1,
    id: 'to_name',
    label: '상호명',
    type: 'text',
    name: 'to_name',
    validation: {},
  },
  {
    unique: 2,
    id: 'user_email',
    label: '답변 받으실 이메일 주소',
    type: 'text',
    name: 'user_email',
    validation: {},
  },
];
