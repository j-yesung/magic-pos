import useKioskState, { setMaxAmount } from '@/shared/store/kiosk';
import Image from 'next/image';
import styles from './styles/MenuOptionContainer.module.css';
import MenuInfo from '@/components/kiosk/menu-option/MenuInfo';
import OptionRow from '@/components/kiosk/menu-option/OptionRow';
import Amount from '@/components/kiosk/menu-option/Amount';
import { useEffect } from 'react';

const MenuOptionContainer = () => {
  const selectedMenu = useKioskState(state => state.selectedMenu);

  useEffect(() => {
    setMaxAmount(selectedMenu?.remain_ea ?? 0);
  }, [selectedMenu]);

  return (
    <>
      {selectedMenu && (
        <section className={styles.container}>
          <Image
            src={selectedMenu?.image_url ?? ''}
            alt={selectedMenu?.name ?? ''}
            width={375}
            height={375}
            priority={true}
          />
          <MenuInfo />
          {selectedMenu?.menu_option
            .filter(option => option.is_use)
            .map(option => <OptionRow key={option.id} option={option} />)}
          <div className={styles.emptyRow}>&nbsp;</div>
          <Amount />
        </section>
      )}
    </>
  );
};

export default MenuOptionContainer;
