import { supabase } from '@/shared/supabase';

type values = Record<string, string>;

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
  console.log('values: ', values);
  const { email, password } = values;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};
