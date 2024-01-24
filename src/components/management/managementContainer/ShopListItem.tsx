import useToast from '@/hooks/toast/useToast';
import { groupByKey } from '@/shared/helper';
import useManagementStore from '@/shared/store/management';
import { MenuItemWithOption, Tables } from '@/types/supabase';
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
  const [storeOrderInTableByMenuList, setStoreOrderInTableByMenuList] = useState<MenuItemWithOption[]>([]);
  const { setIsSideBar, setOrderId } = useManagementStore();
  const { toast } = useToast();

  const clickOrderDataReFetchHandler = () => {
    if (storeOrderInTable.length === 0) {
      toast('주문내역이 없습니다 ', {
        type: 'danger',
        position: 'top-center',
        showCloseButton: faltse,
        autoClose: 3000,
      });
    } else {
      setOrderId({ id: storeOrderInTableById, status: '테이블', number: `${shopData.position}` });
      setIsSideBar();
    }
  };
  useEffect(() => {
    if (storeOrderData && shopData) {
      const data = storeOrderData?.filter(x => x.table_id === shopData.id);
      const idData = [];
      const menuData = [];
      for (let i = 0; i < data.length; i++) {
        idData.push(data[i].id);
        menuData.push(data[i].menu_list);
      }
      setStoreOrderInTableById([...idData]);
      setStoreOrderInTable([...data]);
      setStoreOrderInTableByMenuList([...JSON.parse(JSON.stringify(menuData.flat()))]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopData, storeOrderData]);

  return (
    <div
      className={clsx(styles['shop-list-item'], index % 3 === 2 && styles['list-item-row'])}
      onClick={clickOrderDataReFetchHandler}
    >
      <div className={styles['item-table']}>테이블 {shopData.position}</div>
      <div className={styles['item-menu-box']}>
        {[...groupByKey<MenuItemWithOption>(storeOrderInTableByMenuList, 'unique')].map(([key, menu]) => {
          return (
            <div className={styles['item-menu']} key={key}>
              <span>{menu[0].name}</span>
              <span>{menu.length}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopListItem;
