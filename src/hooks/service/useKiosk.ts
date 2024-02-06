import { useNumberOrderFetchQuery } from '@/hooks/query/order/useNumberOrderFetchQuery';
import { useStoreOrderFetchQuery } from '@/hooks/query/order/useStoreOrderFetchQuery';
import { useFetchQuery } from '@/hooks/query/store/useFetchQuery';
import useFetchTable from '@/hooks/query/table/useFetchTable';
import { isEmptyObject } from '@/shared/helper';
import { CategoryWithMenuItemWithStore, MenuItemWithOption } from '@/types/supabase';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

export const useIsOrderAllReady = (orderIdList: string[], storeId: string) => {
  // numberOrderData: 번호표 주문 (포장, 테이블 번호가 없는 매장 주문)
  // storeOrderData: 테이블 주문 (테이블 번호가 있는 매장 주문)
  const { storeOrderData } = useStoreOrderFetchQuery(orderIdList, storeId);
  const { numberOrderData } = useNumberOrderFetchQuery(orderIdList, storeId);
  const [isAllReady, setIsAllReady] = useState(false);

  useEffect(() => {
    if (orderIdList.length > 0) {
      (async () => {
        let isOrderAllReady = true;

        if (storeOrderData?.data) {
          if (storeOrderData.data?.length > 0 && storeOrderData.data.find(d => !d.is_done)) {
            isOrderAllReady = false;
          }
        }

        if (numberOrderData?.data) {
          if (numberOrderData.data?.length > 0 && numberOrderData.data.find(d => !d.is_done)) {
            isOrderAllReady = false;
          }
        }

        setIsAllReady(isOrderAllReady);
      })();
    }
  }, [numberOrderData, storeOrderData]);

  return isAllReady;
};

export const useIsValidURL = ({ tableId, storeId }: { tableId?: string; storeId?: string }) => {
  const { storeInfo, isStoreFetching } = useFetchQuery({ storeId: storeId });
  const { tableInfo, isTableFetching } = useFetchTable({ tableId: tableId, storeId });
  const [isValidURL, setIsValidURL] = useState(true);

  useEffect(() => {
    if (tableId) {
      if (!isTableFetching && !tableInfo) {
        setIsValidURL(false);
      }
    }
    if (!isStoreFetching && !storeInfo) {
      setIsValidURL(false);
    }
  }, [isTableFetching, isStoreFetching]);

  return isValidURL;
};

export const useGetOptionText = () => {
  const getOptionList = (menu: MenuItemWithOption[]) => {
    return menu[0].menu_option
      .map(option => option.menu_option_detail)
      .flat()
      .map(detail => {
        let text = detail.name;
        if (detail.price > 0) text += `(+${detail.price})`;
        return text;
      })
      .join(' / ');
  };

  return { getOptionList };
};

export const useMakeMenuData = () => {
  const { t } = useTranslation();

  const makeMenuData = (menuData: CategoryWithMenuItemWithStore[], storeId: string) => {
    if (isEmptyObject(menuData)) return [];
    const menuList = [];

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
          name: t('recommended'),
          position: 0,
          store: menuData[0].store,
          store_id: storeId,
          menu_item: recommendedList,
        });
      }

      menuList.push(...menuData);
    }

    return menuList;
  };

  return makeMenuData;
};
