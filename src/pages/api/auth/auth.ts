import { supabase } from '@/shared/supabase';
import axios from 'axios';

type values = Record<string, string>;

/**
 * 사업자등록번호 조회
 * @param bno 사업자등록번호
 * @returns 인증 메세지
 */
export const businessNumberCheckHandler = async (bno: string) => {
  const data = { b_no: [bno] };
  const response = await axios.post(
    `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.NEXT_PUBLIC_PUBLIC_DATA_API_KEY}`,
    data,
  );

  return response.status === 200 && response.data.data[0].tax_type_cd === '01'
    ? '인증되었습니다.'
    : response.data.data[0].tax_type;
};

/**
 * 회원가입 시 유저 정보 & 사업자등록번호 store 테이블에 저장
 * @param values 이메일, 비밀번호, 사업자등록번호
 * @returns
 */
export const signUpHandler = async (values: values) => {
  const { email, password, businessNumber } = values;
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  // undefined 체크
  if (authData.session?.user?.id === undefined) {
    throw new Error('User ID is undefined');
  }

  // 사업자등록번호 store 테이블에 저장
  const { data: bnoData, error: bnoError } = await supabase
    .from('store')
    .insert([{ business_number: businessNumber, business_id: authData.session?.user?.id }])
    .select('*');
  if (authError) throw authError;
  if (bnoError) throw bnoError;
  return { authData, bnoData };
};

/**
 * 로그인
 * @param values 이메일, 비밀번호
 */
export const loginHandler = async (values: values) => {
  const { email, password } = values;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

/**
 * 로그아웃
 */
export const logoutHandler = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * 비밀번호 변경 메일 전송
 * @param email 비밀번호 변경 메일받을 이메일
 */
export const resetPasswordHandler = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}/auth/reset`,
  });
  if (!error) {
    alert('메일이 전송되었습니다.\n메일을 확인해 주세요.');
  }
};

/**
 * 비밀번호 재설정
 * @param password 비밀번호
 */
export const updatePasswordHandler = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (data) {
    alert('비밀번호 변경이 완료되었습니다.');
  }
  if (error) throw error;
  return data;
};
