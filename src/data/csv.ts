export const STORE_HEADER = [
  { label: '매장', key: 'order_type' },
  { label: '상품명', key: 'product_name' },
  { label: '가격', key: 'product_price' },
  { label: '수량', key: 'product_ea' },
  { label: '총 가격', key: 'sum' },
  { label: '시간', key: 'sales_date' },
];

export const TAKE_OUT_HEADER = [
  { label: '포장', key: 'order_type' },
  { label: '상품명', key: 'product_name' },
  { label: '가격', key: 'product_price' },
  { label: '수량', key: 'product_ea' },
  { label: '총 가격', key: 'sum' },
  { label: '시간', key: 'sales_date' },
];
/**
 * 토스트 알람에 쓰일 enum
 */
export const NOT_DATA = '데이터가 없습니다.';

/**
 * csv 파일 이름
 */
export const STORE_FILE_NAME = '매장매출내역.csv';
export const TAKE_OUT_FILE_NAME = '포장매출내역.csv';
