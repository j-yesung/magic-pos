export const useErrorMessage = (value: Record<string, string>) => {
  const { password, passwordConfirm } = value;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/g;

  const isPasswordAndConfirmEntered = password && passwordConfirm;
  const isPasswordFormatValid = passwordRegex.test(password);
  const isPasswordMatch = isPasswordAndConfirmEntered ? password === passwordConfirm : true;

  let passwordValidationMessage = '';

  if (passwordConfirm) {
    passwordValidationMessage = isPasswordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.';
  }

  if (password && !isPasswordFormatValid) {
    passwordValidationMessage = '비밀번호 형식이 올바르지 않습니다.';
  }

  const isPasswordValid = isPasswordAndConfirmEntered ? isPasswordMatch && isPasswordFormatValid : false;

  return {
    isPasswordMatch,
    passwordValidationMessage,
    isPasswordValid,
  };
};
