import axios from 'axios';

/**
 *
 * @param link_string  https:// url
 * @returns null 또는 metaImage를 return 합니다.
 */
export const getOpenGraphMetaImage = async (link_string: string) => {
  try {
    const data = { url: link_string };
    const { data: openGraphInfo } = await axios.post(process.env.NEXT_PUBLIC_META_API_KEY!, data);

    return openGraphInfo;
  } catch (error) {
    // 기존 default image로 대체하기 위해 return null
    return null;
  }
};
