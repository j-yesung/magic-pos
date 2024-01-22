import { supabase } from '@/shared/supabase';

type values = Record<string, string>;
/**
 * 회원가입 시 유저 정보 & 사업자등록번호 store 테이블에 저장
 * @param values 이메일, 비밀번호, 사업자등록번호
 * @returns
 */
export const signUpHandler = async (values: values) => {
  const { email, password, businessName, businessNumber } = values;
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
    .insert([{ business_number: businessNumber, business_name: businessName, business_id: authData.session?.user?.id }])
    .select('*');
  if (bnoError) throw bnoError;
  if (authError) throw authError;
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
  if (error && error.status === 400) {
    throw error;
  }
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
export const resetPasswordHandler = async (values: values) => {
  const { email } = values;
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}/auth/reset`,
  });
};

/**
 * 비밀번호 재설정
 * @param password 비밀번호
 */
export const updatePasswordHandler = async (values: values) => {
  const { password } = values;
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
};

/**
 * 유저 세션 정보 가져오기
 */
export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};

/**
 * 이메일 중복 체크
 * @param email 이메일
 * @returns 중복된 이메일이면 true, 아니면 false
 */
export const checkEmailHandler = async (values: values) => {
  const { email } = values;
  const { data, error } = await supabase.from('profiles').select('email').eq('email', email);
  if (error) throw error;
  if (data.length === 0) return false;
  else return data[0].email === email;
};

/**
 * 스토어 id 가져오기
 * 현재 로그인한 세션 user id와 store 테이블의 business_id 컬럼과 비교하고 일치하면 storeId를 로컬 스토리지에 저장
 * @returns 현재 로그인한 store id
 */
export const getStoreId = async () => {
  const session = await getUserSession();
  const userId = session.session?.user.id;
  const { data, error } = await supabase.from('store').select('id').eq('business_id', userId!);
  if (error) throw error;
  return data;
};
