const HTTPS = 'https://';
export const checkValidUrl = (url: string) => {
  const regUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regUrl.test(url);
};

export const checkHttp = (url: string) => {
  if (url.includes('https://')) return url;
  if (!url.includes('https://')) return HTTPS + url;
};
