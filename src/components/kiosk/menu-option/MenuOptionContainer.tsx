import React from 'react';
import useKioskState from '@/shared/store/kiosk';
import Image from 'next/image';
import styles from './styles/MenuOptionContainer.module.css';
import MenuInfo from '@/components/kiosk/menu-option/MenuInfo';
import OptionRow from '@/components/kiosk/menu-option/OptionRow';
import TotalPrice from '@/components/kiosk/common/TotalPrice';
import Amount from '@/components/kiosk/menu-option/Amount';

const MenuOptionContainer = () => {
  const selectedMenu = useKioskState(state => state.selectedMenu);
  const amount = useKioskState(state => state.amount);
  const selectedOptions = useKioskState(state => state.selectedOptions);

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
