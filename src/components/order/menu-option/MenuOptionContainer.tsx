import React from 'react';
import useOrderStore from '@/shared/store/order';
import Image from 'next/image';
import styles from './styles/MenuOptionContainer.module.css';
import MenuInfo from '@/components/order/menu-option/MenuInfo';
import OptionRow from '@/components/order/menu-option/OptionRow';

const MenuOptionContainer = () => {
  const { selectedMenu } = useOrderStore();

  return (
    <section className={styles.container}>
      <Image src={selectedMenu?.image_url ?? ''} alt={selectedMenu?.name ?? ''} width={300} height={300} />
      <MenuInfo />
      {selectedMenu?.menu_option.map(option => <OptionRow key={option.id} option={option} />)}
    </section>
  );
};

export default MenuOptionContainer;
