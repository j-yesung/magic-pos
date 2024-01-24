import { CategoryWithMenuItemWithStore } from '@/types/supabase';
import { isEmptyObject } from '@/shared/helper';

export const makeMenuData = (menuData: CategoryWithMenuItemWithStore[], storeId: string) => {
  if (isEmptyObject(menuData)) return [];
  const menuList = [...menuData];

  // TODO: 에러 처리
  if (isEmptyObject(menuData)) console.error('something wrong');
  else {
    const recommendedList = menuData
      .map(menu => menu.menu_item)
      .flat()
      .filter(menu => menu.recommended);

    // 추천 메뉴가 있을시 추천 메뉴 추가
    if (recommendedList.length > 0) {
      menuList.push({
        id: 'recommended',
        name: '추천 메뉴',
        position: 0,
        store: menuData[0].store,
        store_id: storeId,
        menu_item: recommendedList,
      });
    }
  }

  return menuList;
};
