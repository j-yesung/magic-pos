import axios from 'axios';

/**
 *
 * @param link_string  https:// url
 * @returns null 또는 metaImage를 return 합니다.
 */
const HTTPS = 'https://';
export const getOpenGraphMetaImage = async (link_string: string) => {
  try {
    const data = { url: link_string };
    const { data: openGraphInfo } = await axios.post(process.env.NEXT_PUBLIC_META_API_KEY!, data);

    return checkHttp(openGraphInfo);
  } catch (error) {
    // 기존 default image로 대체하기 위해 return null
    return null;
  }
};
const checkHttp = (url: string) => {
  if (url.includes('https://')) return url;
  if (!url.includes('https://')) return HTTPS + url;
};
