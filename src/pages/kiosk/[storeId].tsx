import React, { ReactNode, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import OrderLayout from '@/components/layout/order/OrderLayout';
import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase/menu-category';
import { GetServerSideProps } from 'next';
import { CategoryWithMenuItemWithStore } from '@/types/supabase';
import useKioskState, {
  resetOrderList,
  setMenuData,
  setSelectedLanguage,
  setStoreId,
  setStoreName,
  setTableId,
} from '@/shared/store/kiosk';
import { useRouter } from 'next/router';
import KioskContainer from '@/components/kiosk/KioskContainer';
import { useModal } from '@/hooks/modal/useModal';
import { useIsInvalidURL, useIsOrderAllReady } from '@/hooks/service/useKiosk';
import { translateMenuData } from '@/server/service/translate';
import { TargetLanguageCode } from 'deepl-node';
import { makeMenuData } from '@/utils/kiosk-helper';

interface OrderIndexPageProps {
  menuData: CategoryWithMenuItemWithStore[];
  storeId: string;
  tableId: string;
}

const OrderIndexPage = ({ menuData, storeId, tableId }: OrderIndexPageProps) => {
  const orderIdList = useKioskState(state => state.orderIdList);
  const prevStoreId = useKioskState(state => state.storeId);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInvalidURL = useIsInvalidURL({ storeId, tableId });
  const isOrderAllReady = useIsOrderAllReady(orderIdList, storeId);
  const { MagicModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    if (orderIdList.length > 0 && !isOrderAllReady) {
      MagicModal.confirm({
        content: '아직 준비 중인 메뉴가 있습니다. 추가로 주문 하시겠습니까?',
        confirmButtonText: '추가 주문 하기',
        confirmButtonCallback: () => {
          resetOrderList();
        },
        cancelButtonText: '주문 확인 하기',
        cancelButtonCallback: () => {
          router.push('/kiosk/receipt');
        },
      });
    }
  }, [isOrderAllReady]);

  useEffect(() => {
    const menuList = makeMenuData(menuData, storeId);
    setMenuData(menuList);
  }, [menuData]);

  useEffect(() => {
    // 주소창에 uuid가 노출되는 것을 막기 위해 주소창의 URL만을 변경한다. (페이지 이동X)
    // window.history.replaceState({}, '/order', '/order');
    if (menuData && menuData.length > 0) {
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
    console.log(router.query.lang);
    if (router.query.lang) {
      setSelectedLanguage(`lang-${router.query.lang}`);
    } else {
      setSelectedLanguage(`lang-ko`);
    }

    setIsLoaded(true);
  }, []);

  return (
    <>
      {isInvalidURL && isLoaded && <KioskContainer />}
      {/* TODO: 유효 하지 않은 가게 디자인 */}
      {!isInvalidURL && isLoaded && <div>유효 하지 않은 가게입니다.</div>}
    </>
  );
};

OrderIndexPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderIndexPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { storeId, tableId = null, lang = 'ko' } = context.query;
  let { data: menuData } = await fetchCategoriesWithMenuItemByStoreId((storeId || '').toString());

  if (lang !== 'ko') {
    menuData = await translateMenuData(menuData, lang as TargetLanguageCode);
  }

  return {
    props: {
      menuData,
      storeId,
      tableId,
    },
  };
};
