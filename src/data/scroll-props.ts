import { Menu, SelectShot, StartShot } from './screenshot-export';

/**
 * @description 키오스크 스크롤에 따른 애니메이션 효과를 위한 상수
 */
export const SCROLL_THRESHOLDS = [1200, 1900, 2600];
export const MAIN_TITLES = ['편리함의 시작', '한 눈의 보는 메뉴', '다양한 옵션 선택까지'];
export const FIRST_CAPTIONS = [
  '매직포스를 사용한다면',
  '이미지와 가격을 한 눈에 비교하고',
  '메뉴를 선택하고 나만의 옵션을 추가해 보세요. ',
];
export const SECOND_CAPTIONS = [
  '주문하러 카운터까지 갈 필요가 없어요.',
  '간편하게 메뉴를 고를 수 있어요.',
  '번거롭게 말 할 필요 없이 몇 번의 터치 주문 완료!',
];

export const iphones = [StartShot, Menu, SelectShot];
