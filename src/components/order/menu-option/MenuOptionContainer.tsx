import React from 'react';
import useOrderStore from '@/shared/store/order';
import Image from 'next/image';
import styles from './styles/MenuOptionContainer.module.css';
import MenuInfo from '@/components/order/menu-option/MenuInfo';

const MenuOptionContainer = () => {
  const { selectedMenu } = useOrderStore();

  return (
    <section className={styles.container}>
      <Image src={selectedMenu?.image_url ?? ''} alt={selectedMenu?.name ?? ''} width={300} height={300} />
      <MenuInfo />
    </section>
  );
};

export default MenuOptionContainer;
