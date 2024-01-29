/**
 * 해당 객체가 빈 객체인지 판단
 * @param obj
 */
export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};

/**
 * 숫자를 화폐 형식(원) 문자열로 바꿉니다.
 * @param num
 * @param isKor 원으로 나타낼지 WON으로 나타낼지 정합니다.
 */
export const convertNumberToWon = (num: number, isKor: boolean = true) => {
  return `${new Intl.NumberFormat('ko-KO', { style: 'decimal', currency: 'KRW' }).format(num)}${isKor ? '원' : '₩'}`;
};

/**
 * 하나 이상의 키를 가지는 객체를 담고 있는 배열을 지정한 키를 기준으로 그룹화하여 객체로 반환합니다.
 * [{name: 'lee', age: 1}, {name: 'lee', age: 10}, {name: 'kim', age: 12}]   => {'lee': [{name: 'lee', age: 1}, {name: 'lee', age: 10}], 'kim': [{name: 'kim', age: 12}]}
 * @param arr 객체의 배열
 * @param key 그룹화의 기준이 될 Key
 */
export const groupByKey = <T extends { [key: string | number]: unknown }>(arr: T[], key: keyof T) => {
  return arr.reduce((acc, cur) => {
    const stringKey = String(cur[key]);
    if (acc.get(stringKey)) acc.get(stringKey)?.push(cur);
    else acc.set(stringKey, [cur]);
    return acc;
  }, new Map<string, T[]>());
};

/**
 * 페이지에 적용될 공통 타이틀 양식을 반환합니다.
 * @param title
 */
export const makeTitle = (title: string) => {
  if (title === '') return 'Magic POS';
  return `${title} - Magic POS`;
};
