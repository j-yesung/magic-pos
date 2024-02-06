import useManagementClickHandler from '@/hooks/service/management/useManagementClickHandler';
import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption, Tables } from '@/types/supabase';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles/ShopListItem.module.css';

interface propsType {
  shopData: Tables<'store_table'>;
  storeOrderData?: Tables<'order_store'>[];
}

const ShopListItem = ({ shopData, storeOrderData }: propsType) => {
  const [storeOrderInTable, setStoreOrderInTable] = useState<Tables<'order_store'>[]>([]);
  const [storeOrderInTableById, setStoreOrderInTableById] = useState<string[]>([]);
  const [storeOrderInTableByMenuList, setStoreOrderInTableByMenuList] = useState<MenuItemWithOption[]>([]);
  const { clickShopOrderDataHandler } = useManagementClickHandler();

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
      className={clsx(styles['shop-list-item'])}
      onClick={() => {
        clickShopOrderDataHandler(storeOrderInTable, storeOrderInTableById, shopData.position as number);
      }}
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
