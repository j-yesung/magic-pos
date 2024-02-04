import {
  MENU_CATEGORY_PATH,
  MENU_ITEM_PATH,
  ORDER_CHECK_LIST_PATH,
  PLATFORM_PATH,
  SALES_PATH,
  STORE_PATH,
  TABLE_PATH,
} from './url-list';

export const adminCategories = [
  { id: 1, name: '주문 내역 확인', url: ORDER_CHECK_LIST_PATH, active: false },
  { id: 2, name: '매출 관리', url: SALES_PATH, active: false },
  { id: 3, name: '플랫폼 관리', url: PLATFORM_PATH, active: false },
  { id: 4, name: '테이블 관리', url: TABLE_PATH, active: true },
  { id: 5, name: '카테고리 관리', url: MENU_CATEGORY_PATH, active: false },
  { id: 6, name: '메뉴 관리', url: MENU_ITEM_PATH, active: false },
  { id: 7, name: '가게 설정', url: STORE_PATH, active: false },
];

export const modeText = ['현재 운영 모드를 보고 있습니다.', '현재 관리자 모드를 보고 있습니다.'];
export const modeSubText = [
  '※ 관리자 모드로 전환하려면 토글 버튼을 클릭해 주세요.',
  '※ 운영 모드로 전환하려면 토글 버튼을 클릭해 주세요.',
];
