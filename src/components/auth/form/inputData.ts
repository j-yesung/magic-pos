export const signupInput = [
  {
    id: 1,
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
    id: 2,
    type: 'password',
    placeholder: '비밀번호',
    name: 'password',
    maxLength: 16,
    validation: {
      required: '비밀번호는 필수 항목입니다.',
      minLength: {
        value: 6,
        message: '비밀번호는 최소 6자리 이상이어야 합니다.',
      },
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/g,
        message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
      },
    },
  },
  {
    id: 3,
    type: 'password',
    placeholder: '비밀번호 확인',
    name: 'confirmPassword',
    validation: {},
    validateFunc: (password: string) => ({
      validate: (value: string) => value === password || '비밀번호가 일치하지 않습니다.',
    }),
  },
  {
    id: 4,
    label: '상호명을 입력해 주세요.',
    type: 'text',
    placeholder: '상호명',
    name: 'storeName',
    validation: {},
  },
  {
    id: 5,
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
