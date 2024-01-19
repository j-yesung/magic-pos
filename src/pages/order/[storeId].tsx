import React, { ReactNode, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import OrderLayout from '@/components/layout/order/OrderLayout';
import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase/menu-category';
import { GetServerSideProps } from 'next';
import { CategoryWithMenuItemWithStore } from '@/types/supabase';
import useOrderStore, { resetOrderList, setMenuData, setStoreId, setStoreName, setTableId } from '@/shared/store/order';
import { isEmptyObject } from '@/shared/helper';
import { useRouter } from 'next/router';
import OrderContainer from '@/components/order/OrderContainer';
import { useModal } from '@/hooks/modal/useModal';
import { useStoreOrderFetchQuery } from '@/hooks/order/useStoreOrderFetchQuery';
import { useNumberOrderFetchQuery } from '@/hooks/order/useNumberOrderFetchQuery';
import { useGetQuery } from '@/hooks/store/useGetQuery';
import useFetchTable from '@/hooks/table/useFetchTable';

const OrderIndexPage = ({
  menuData,
  storeId,
  tableId,
}: {
  menuData: CategoryWithMenuItemWithStore[];
  storeId: string;
  tableId: string;
}) => {
  const orderIdList = useOrderStore(state => state.orderIdList);
  const prevStoreId = useOrderStore(state => state.storeId);
  const { storeInfo } = useGetQuery({ storeId: storeId });
  const { tableInfo } = useFetchTable({ tableId: tableId });
  const { storeOrderData } = useStoreOrderFetchQuery(orderIdList, storeId);
  const { numberOrderData } = useNumberOrderFetchQuery(orderIdList, storeId);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInvalidURL, setIsInvalidURL] = useState(true);
  const { MagicModal } = useModal();
  const router = useRouter();

  // numberOrderData: 번호표 주문 (포장, 테이블 번호가 없는 매장 주문)
  // storeOrderData: 테이블 주문 (테이블 번호가 있는 매장 주문)
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

        if (!isOrderAllReady) {
          MagicModal.confirm({
            content: '아직 준비 중인 메뉴가 있습니다. 추가로 주문 하시겠습니까?',
            confirmButtonText: '추가 주문 하기',
            confirmButtonCallback: () => {
              resetOrderList();
            },
            cancelButtonText: '주문 확인 하러 가기',
            cancelButtonCallback: () => {
              router.push('/order/receipt');
            },
          });
        }
      })();
    }
  }, [numberOrderData, storeOrderData]);

  useEffect(() => {
    if (!storeInfo) {
      setIsInvalidURL(false);
    } else {
      setIsInvalidURL(true);
    }

    if (tableId) {
      if (!tableInfo) {
        setIsInvalidURL(false);
      } else {
        setIsInvalidURL(true);
      }
    }
  }, [storeInfo, tableInfo]);

  useEffect(() => {
    // 주소창에 uuid가 노출되는 것을 막기 위해 주소창의 URL만을 변경한다. (페이지 이동X)
    // window.history.replaceState({}, '/order', '/order');
    // TODO: 에러 처리
    if (isEmptyObject(menuData)) console.error('something wrong');
    else {
      const recommendedList = menuData
        .map(menu => menu.menu_item.flat())
        .flat()
        .filter(menu => menu.recommended);

      const menuList = [];

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

      menuList.push(...menuData);

      setMenuData(menuList);
      setStoreName(menuData[0].store?.business_name ?? '');
    }

    if (storeId) {
      // 이전에 저장된 storeId가 현재 storeId와 다르면 다른 가게로 온것이므로 주문 목록 초기화 시킴
      if (prevStoreId && prevStoreId !== storeId) {
        resetOrderList();
      }
      setStoreId(storeId);
    }
    if (tableId) setTableId(tableId);
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isInvalidURL && isLoaded && <OrderContainer />}
      {/* TODO: 유효 하지 않은 가게 디자인 */}
      {!isInvalidURL && <div>유효 하지 않은 가게입니다.</div>}
    </>
  );
};

OrderIndexPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderIndexPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { storeId, tableId = null } = context.query;
  const { data: menuData } = await fetchCategoriesWithMenuItemByStoreId((storeId || '').toString());

  return {
    props: {
      menuData,
      storeId,
      tableId,
    },
  };
};
