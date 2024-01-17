export const adminCategories = [
  { id: 1, name: '주문 내역 확인', url: '/admin/order-check-list', active: false },
  { id: 2, name: '매출 관리', url: '/admin/sales', active: false },
  { id: 3, name: '플랫폼 관리', url: '/admin/platform', active: false },
  { id: 4, name: '테이블 관리', url: '/admin/table', active: true },
  { id: 5, name: '카테고리 관리', url: '/admin/menu-category', active: false },
  { id: 6, name: '메뉴 관리', url: '/admin/menu-item', active: false },
  { id: 7, name: '가게 설정', url: '/admin/store', active: false },
];

export const modeText = ['현재 운영 모드를 보고 있습니다.', '현재 관리자 모드를 보고 있습니다.'];
export const modeSubText = [
  '※ 관리자 모드로 전환하려면 토글 버튼을 클릭해 주세요.',
  '※ 운영 모드로 전환하려면 토글 버튼을 클릭해 주세요.',
];
