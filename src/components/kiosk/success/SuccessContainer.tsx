import { RECEIPT_PATH } from '@/data/url-list';
import { useNumberOrderSetQuery } from '@/hooks/query/order/useNumberOrderSetQuery';
import { useStoreOrderSetQuery } from '@/hooks/query/order/useStoreOrderSetQuery';
import { useStoreSetQuery } from '@/hooks/query/store/useStoreSetQuery';
import { useUserTokenSetQuery } from '@/hooks/query/user-token/useUserTokenSetQuery';
import { useSalesQuery } from '@/hooks/service/sales/useSalesQuery';
import { useModal } from '@/hooks/service/ui/useModal';
import useToast from '@/hooks/service/ui/useToast';
import { decrementRemainEaByMenuId } from '@/server/api/supabase/menu-item';
import { getTokenHandler } from '@/shared/firebase';
import { groupByKey } from '@/shared/helper';
import useKioskState, { ORDER_STEP, addOrderId, getTotalPrice, setOrderNumber, setStep } from '@/shared/store/kiosk';
import { Tables, TablesInsert } from '@/types/supabase';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdOutlineAddHome } from 'react-icons/md';
import MenuHeader from '../common/MenuHeader';
import styles from './styles/SuccessContainer.module.css';
import Success from '/public/icons/order-success.svg';

const SuccessContainer = ({ payment }: { payment?: Payment }) => {
  const orderList = useKioskState(state => state.orderList);
  const storeId = useKioskState(state => state.storeId);
  const tableId = useKioskState(state => state.tableId);
  const menuData = useKioskState(state => state.menuData);
  const orderNumber = useKioskState(state => state.orderNumber);
  const orderType = useKioskState(state => state.orderType);
  const selectedLanguage = useKioskState(state => state.selectedLanguage);
  const orderIdList = useKioskState(state => state.orderIdList);

  const { addSales } = useSalesQuery();
  const { addStoreOrder } = useStoreOrderSetQuery();
  const { addNumberOrder } = useNumberOrderSetQuery();
  const { addUserToken } = useUserTokenSetQuery();
  const { incrementOrderNumber, newOrderNumber } = useStoreSetQuery();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { MagicModal } = useModal();

  const clickCheckOrderHandler = () => {
    router.push(RECEIPT_PATH);
  };

  useEffect(() => {
    if (payment?.status === 'DONE') {
      if (!orderType) {
        console.error('주문 타입이 없습니다.');
        return;
      }

      if (!storeId) {
        console.error('가게 정보가 없습니다.');
        return;
      }

      if (orderIdList.includes(payment.orderId)) return;
      // 결제 승인시 sales테이블에 담아놓은 orderList 데이터를 insert 한다.
      const group = groupByKey<Tables<'menu_item'>>(orderList, 'id');
      const salesData: TablesInsert<'sales'>[] = [...group].map(([, value]) => ({
        store_id: storeId,
        sales_date: payment.approvedAt,
        product_name: value[0].name,
        product_ea: value.length,
        product_category: menuData?.find(menu => menu.id === value[0].category_id)?.name,
        product_price: value[0].price,
        order_type: orderType.type,
      }));

      addSales(salesData);
      incrementOrderNumber(storeId);
      addOrderId(payment.orderId);
    }
  }, [orderList]);

  // sales 테이블에 데이터 업로드시 orderIdList가 바뀐다. orderIdList가 바뀌면
  // 주문내역 테이블 (order_store, order_number)에 insert 한다.
  useEffect(() => {
    if (payment?.status === 'DONE' && storeId && newOrderNumber && newOrderNumber > 0) {
      const orderData = {
        order_number: newOrderNumber,
        store_id: storeId,
        menu_list: orderList.map(order => JSON.parse(JSON.stringify(order))),
        order_time: payment.approvedAt,
        order_id: payment.orderId,
        total_price: getTotalPrice(orderList),
        is_done: false,
        payment_method: payment.method,
      };

      if (orderType.type == 'togo') {
        // 포장 주문 insert !!
        addNumberOrder({ ...orderData, is_togo: true });
      } else if (orderType.type === 'store') {
        // 매장 주문 insert!
        if (tableId) {
          addStoreOrder({ ...orderData, table_id: tableId });
        } else {
          addNumberOrder({ ...orderData, is_togo: false });
        }
      }

      // 주문한 메뉴의 남은 수량 감소 시키기
      orderList.forEach(menu => {
        decrementRemainEaByMenuId(menu.id);
      });

      // 알림 발송을 위한 유저 토큰 생성 뒤 저장
      getTokenHandler().then(res => {
        if (res) {
          addUserToken({ order_id: payment.orderId, token: res });
        } else {
          try {
            if (Notification.permission !== 'granted') {
              MagicModal.confirm({
                content: '알림을 허용해주어야 메뉴 준비 완료 메시지를 받을 수 있습니다!',
                cancelButtonText: '알림 받지 않기',
                confirmButtonText: '허용하고 알림 받기',
                confirmButtonCallback: () => {
                  Notification.requestPermission().then(permission => {
                    if (permission !== 'granted') {
                      toast('알림을 허용해주어야 메뉴 준비 완료 메시지를 받을 수 있습니다!', {
                        type: 'warn',
                        position: 'top-center',
                        autoClose: 4000,
                      });
                    } else {
                      // 푸시 승인됐을 때 처리할 내용
                      console.log('푸시 승인됨');
                      getTokenHandler().then(res => {
                        if (res) addUserToken({ order_id: payment.orderId, token: res });
                      });
                    }
                  });
                },
                icon: <MdOutlineAddHome size={60} />,
              });
            }
          } catch (err) {
            toast('모바일 브라우저로 주문 하셨기 때문에 메뉴 준비 완료시 알림이 가지 않습니다.', {
              position: 'top-center',
              autoClose: 100000,
              showCloseButton: true,
              type: 'warn',
            });
          }

          console.error('토큰 발급에 실패하였습니다.');
        }
      });

      setStep(ORDER_STEP.SUCCESS);
      setOrderNumber(newOrderNumber);
    }
  }, [newOrderNumber]);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage.split('-')[1]);
    setIsPageLoading(false);
  }, []);

  return (
    <>
      {!isPageLoading && (
        <div className={styles.container}>
          <MenuHeader />
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <h1>{t('order-success')}</h1>
              <motion.div initial={{ rotateY: 0 }} animate={{ rotateY: 358 }} transition={{ duration: 1, loop: 3 }}>
                <Success />
              </motion.div>
              <div className={styles.orderNumber}>
                {t('order-number')} <strong>{orderNumber}</strong>
              </div>
              <div className={styles.checkOrder} onClick={clickCheckOrderHandler}>
                {t('footer.check-order')}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessContainer;
