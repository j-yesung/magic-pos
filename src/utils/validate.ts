const HTTPS = 'https://';
const HTTP = 'http://';
export const checkValidUrl = (url: string) => {
  const regUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regUrl.test(url);
};

export const checkHttp = (url: string) => {
  if (url.includes(HTTPS) || url.includes(HTTP)) return url;
  if (!url.includes(HTTPS) || !url.includes(HTTP)) return HTTPS + url;
};
