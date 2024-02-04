import { AddPlatFormType, EditPlatFormType } from '@/types/platform';

const HTTPS = 'https://';
const EXCEPTION_IMAGE_ERROR = '//';
/**
 *
 * @param url platform 카드 등록 || 수정 시 https 검사 합니다.
 * @returns
 */
export const ensureHttpsUrl = (data: AddPlatFormType | EditPlatFormType) => {
  if (data.link_url) {
    const validatedUrlData = prependHttpsIfNeeded(data);
    return validatedUrlData;
  }

  return data;
};

const prependHttpsIfNeeded = (target: AddPlatFormType | EditPlatFormType) => {
  if (!target.link_url.startsWith(HTTPS)) {
    target.link_url = HTTPS + target.link_url;
    return target;
  }
  return target;
};

/**
 *
 * @param imageUrl openGraph에서 이미지 추출시 https:// 가 없는 image url도 있기에 검사 합니다.
 * @returns
 */
export const handleMetaImageException = (imageUrl: string | null) => {
  if (!imageUrl) return null;
  if (imageUrl.startsWith(EXCEPTION_IMAGE_ERROR)) {
    const sliceImageUrl = imageUrl.substring(2);
    return HTTPS + sliceImageUrl;
  }

  return imageUrl;
};
