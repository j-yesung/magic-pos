import axios from 'axios';

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
    ? '사업자등록번호가 인증되었습니다.'
    : '사업자등록번호를 다시 입력해 주세요.';
};
