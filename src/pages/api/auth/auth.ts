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
 * 회원가입
 * @param values 이메일, 비밀번호
 */
export const signUpHandler = async (values: values) => {
  const { email, password } = values;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
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
