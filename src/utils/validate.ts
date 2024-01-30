const HTTPS = 'https://';
const WWW = 'www.';

export const checkValidUrl = (url: string) => {
  try {
    const ensureValidUrlEx = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const checkedWwwUrl = addWwwIfNeeded(url);
    const checkedHttpUrl = checkHttp(checkedWwwUrl);

    new URL(checkedHttpUrl);
    return ensureValidUrlEx.test(checkedHttpUrl);
  } catch (error) {
    return false;
  }
};

const checkHttp = (url: string) => {
  try {
    new URL(url);
    return url;
  } catch (error) {
    return HTTPS + url;
  }
};

const addWwwIfNeeded = (url: string) => {
  if (url.includes(WWW)) return url;
  return WWW + url;
};
