import { useNumberOrderFetchQuery } from '@/hooks/order/useNumberOrderFetchQuery';
import { useStoreOrderFetchQuery } from '@/hooks/order/useStoreOrderFetchQuery';
import { useFetchQuery } from '@/hooks/query/store/useFetchQuery';
import useFetchTable from '@/hooks/table/useFetchTable';
import { isEmptyObject } from '@/shared/helper';
import { CategoryWithMenuItemWithStore, MenuItemWithOption } from '@/types/supabase';
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
  }, [tableInfo]);

  useEffect(() => {
    if (!isStoreFetching && !storeInfo) {
      setIsValidURL(false);
    }
  }, [storeInfo]);

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
