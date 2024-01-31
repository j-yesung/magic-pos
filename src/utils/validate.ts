const HTTPS = 'https://';
const WWW = 'www.';

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const checkValidUrl = (url: string) => {
  try {
    const checkedWwwUrl = addWwwIfNeeded(url);
    const checkedHttpUrl = checkHttp(checkedWwwUrl);

    if (isValidUrl(checkedHttpUrl)) {
      return true;
    } else {
      return false;
    }
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
  if (isValidUrl(url) && !url.includes(WWW)) {
    return WWW + url;
  }
  return url;
};
