export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const convertNumberToWon = (num: number) => {
  return `${new Intl.NumberFormat('ko-KO', { style: 'decimal', currency: 'KRW' }).format(num)}원`;
};
