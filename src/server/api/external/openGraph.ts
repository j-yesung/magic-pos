import axios from 'axios';

/**
 *
 * @param link_string  https:// url
 * @returns null 또는 metaImage를 return 합니다.
 */

export const getOpenGraphMetaImage = async (link_string: string) => {
  try {
    const data = { url: link_string };
    // # OpenGraph API URL - local에서만 사용합니다.
    //NEXT_PUBLIC_META_API_KEY=http://localhost:3000/api/open-graph 이거 안써두 된다
    const { data: openGraphInfo } = await axios.post(window?.location?.origin + '/api/open-graph', data);

    return openGraphInfo as string;
  } catch (error) {
    // 기존 default image로 대체하기 위해 return null
    return null;
  }
};
