import KioskContainer from '@/components/kiosk/KioskContainer';
import OrderLayout from '@/components/layout/kiosk/OrderLayout';
import { useModal } from '@/hooks/service/ui/useModal';
import { useIsOrderAllReady, useIsValidURL, useMakeMenuData } from '@/hooks/service/useKiosk';
import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase/menu-category';
import useKioskState, {
  ORDER_STEP,
  resetOrderList,
  setMenuData,
  setSelectedLanguage,
  setStep,
  setStoreId,
  setStoreName,
  setTableId,
} from '@/shared/store/kiosk';
import { CategoryWithMenuItemWithStore } from '@/types/supabase';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import { translateMenuData } from '@/server/service/translate';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RECEIPT_PATH } from '@/data/url-list';
import { IoBagHandleOutline } from 'react-icons/io5';

interface OrderIndexPageProps {
  menuData: CategoryWithMenuItemWithStore[];
  storeId: string;
  tableId: string;
}

const OrderIndexPage = ({ menuData, storeId, tableId }: OrderIndexPageProps) => {
  const orderIdList = useKioskState(state => state.orderIdList);
  const prevStoreId = useKioskState(state => state.prevStoreId);
  const orderList = useKioskState(state => state.orderList);
  const [isLoaded, setIsLoaded] = useState(false);
  const isValidURL = useIsValidURL({ storeId, tableId });
  const isOrderAllReady = useIsOrderAllReady(orderIdList, storeId);
  const { MagicModal } = useModal();
  const router = useRouter();
  const makeMenuData = useMakeMenuData();

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
          router.push(RECEIPT_PATH);
        },
        icon: <IoBagHandleOutline size={60} />,
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

    if (router.query.lang) {
      setSelectedLanguage(`lang-${router.query.lang}`);
    } else {
      setSelectedLanguage(`lang-ko`);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (storeId) {
      // 이전에 저장된 storeId가 현재 storeId와 다르면 다른 가게로 온것이므로 주문 목록 초기화 시킴
      if (orderList.length > 0 && prevStoreId !== storeId) {
        resetOrderList();
        setStep(ORDER_STEP.CHOOSE_ORDER_TYPE);
      }
      setStoreId(storeId);
    }
    if (tableId) setTableId(tableId);
    else setTableId('');
  }, [prevStoreId]);

  return (
    <>
      {isValidURL && isLoaded && <KioskContainer />}
      {/* TODO: 유효 하지 않은 가게 디자인 */}
      {!isValidURL && isLoaded && <div>유효 하지 않은 가게입니다.</div>}
    </>
  );
};

OrderIndexPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderIndexPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { storeId, tableId = null, lang = 'ko' } = context.query;
  let { data: menuData } = await fetchCategoriesWithMenuItemByStoreId((storeId || '').toString());

  if (storeId && lang !== 'ko') {
    menuData = await translateMenuData(menuData, lang.toString(), storeId.toString());
  }

  return {
    props: {
      menuData,
      storeId,
      tableId,
      ...(await serverSideTranslations(lang ? lang.toString() : 'ko', ['common'])),
    },
  };
};
