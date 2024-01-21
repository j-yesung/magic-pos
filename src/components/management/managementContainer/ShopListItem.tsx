import { useModal } from '@/hooks/modal/useModal';
import useManagementStore from '@/shared/store/management';
import useManagementCssStore from '@/shared/store/management-css';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles/ShopListItem.module.css';

interface propsType {
  shopData: Tables<'store_table'>;
  index: number;
  storeOrderData?: Tables<'order_store'>[];
}

const ShopListItem = ({ shopData, index, storeOrderData }: propsType) => {
  const [storeOrderInTable, setStoreOrderInTable] = useState<Tables<'order_store'>[]>([]);
  const [storeOrderInTableById, setStoreOrderInTableById] = useState<string[]>([]);
  const { setOrderId } = useManagementStore();
  const { setIsListClick } = useManagementCssStore();
  const { MagicModal } = useModal();

  const clickOrderDataReFetchHandler = () => {
    if (storeOrderInTable.length === 0) {
      MagicModal.alert({ content: '주문내역이 없습니다.' });
    } else {
      setOrderId({ id: storeOrderInTableById, status: '테이블', number: `${shopData.position}` });
      setIsListClick(true);
    }
  };
  useEffect(() => {
    if (storeOrderData && shopData) {
      const data = storeOrderData?.filter(x => x.table_id === shopData.id);
      const idData = [];
      for (let i = 0; i < data.length; i++) {
        idData.push(data[i].id);
      }
      setStoreOrderInTableById([...idData]);
      setStoreOrderInTable([...data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopData, storeOrderData]);

  return (
    <div
      className={clsx(styles['shop-list-item'], index % 3 === 2 && styles['list-item-row'])}
      onClick={clickOrderDataReFetchHandler}
    >
      <div className={styles['item-table']}>테이블 {shopData.position}</div>
      <div className={styles['item-order-number']}>
        <span>
          <span>주문 번호</span>
          {storeOrderInTable?.map(item => {
            return (
              <span key={item.id}>
                {item.order_number}
                <span>, </span>
              </span>
            );
          })}
        </span>
      </div>
      <div className={styles['item-status']}>매뉴 준비중</div>
    </div>
  );
};

export default ShopListItem;
