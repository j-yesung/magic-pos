import React from 'react';
import { MenuOptionWithDetail } from '@/types/supabase';
import styles from './styles/OptionRow.module.css';
import OptionDetailRow from '@/components/order/menu-option/OptionDetailRow';

const OptionRow = ({ option }: { option: MenuOptionWithDetail }) => {
  return (
    <div className={styles.container}>
      <h3>{option.name}</h3>
      <div>
        {option.menu_option_detail.map(detail => (
          <OptionDetailRow key={detail.id} detail={detail} />
        ))}
      </div>
    </div>
  );
};

export default OptionRow;
