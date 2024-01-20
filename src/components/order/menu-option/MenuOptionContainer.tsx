import React from 'react';
import useOrderStore from '@/shared/store/order';
import Image from 'next/image';
import styles from './styles/MenuOptionContainer.module.css';
import MenuInfo from '@/components/order/menu-option/MenuInfo';
import OptionRow from '@/components/order/menu-option/OptionRow';
import Amount from '@/components/order/menu-option/Amount';
import TotalPrice from '@/components/order/common/TotalPrice';

const MenuOptionContainer = () => {
  const selectedMenu = useOrderStore(state => state.selectedMenu);
  const amount = useOrderStore(state => state.amount);
  const selectedOptions = useOrderStore(state => state.selectedOptions);

  return (
    <>
      {selectedMenu && (
        <section className={styles.container}>
          <Image src={selectedMenu?.image_url ?? ''} alt={selectedMenu?.name ?? ''} width={375} height={375} />
          <MenuInfo />
          {selectedMenu?.menu_option.map(option => <OptionRow key={option.id} option={option} />)}
          <div className={styles.emptyRow}>&nbsp;</div>
          <Amount />
          <TotalPrice
            itemList={new Array(amount).fill(true).map(() => {
              const menu = { ...selectedMenu };
              menu.menu_option = selectedOptions;
              return menu;
            })}
          />
        </section>
      )}
    </>
  );
};

export default MenuOptionContainer;
