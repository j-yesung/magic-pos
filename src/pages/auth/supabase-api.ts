import { supabase } from '@/shared/supabase';

type values = Record<string, string>;

/**
 * 회원가입
 * @param values 이메일, 비밀번호
 * @returns 데이터
 */
export const signUp = async (values: values) => {
  console.log('values: ', values);
  const { email, password } = values;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};
