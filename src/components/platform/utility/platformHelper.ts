import { AddPlatFormType, EditPlatFormType } from '@/types/platform';

const HTTPS = 'https://';

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
