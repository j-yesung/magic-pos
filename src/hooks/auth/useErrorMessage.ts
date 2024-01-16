export const useErrorMessage = (value: Record<string, string>) => {
  const { password, passwordConfirm } = value;

  /// 비밀번호와 비밀번호 확인이 모두 입력된 경우에만 비밀번호 일치 여부를 검사합니다.
  const isPasswordMatch = password && passwordConfirm ? password === passwordConfirm : true;

  // 비밀번호 유효성 메시지는 비밀번호 확인 필드에 값이 있을 때만 설정합니다.
  const passwordValidationMessage = passwordConfirm
    ? isPasswordMatch
      ? '비밀번호가 일치합니다.'
      : '비밀번호가 일치하지 않습니다.'
    : '';

  return {
    isPasswordMatch,
    passwordValidationMessage,
    isPasswordValid: passwordConfirm ? isPasswordMatch : true,
  };
};
