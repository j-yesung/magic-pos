import React, { useEffect, useState } from 'react';
import { MenuOptionWithDetail, Tables } from '@/types/supabase';
import styles from './styles/OptionRow.module.css';
import OptionDetailRow from '@/components/order/menu-option/OptionDetailRow';

const OptionRow = ({ option }: { option: MenuOptionWithDetail }) => {
  const [selectedDetail, setSelectedDetail] = useState<Tables<'menu_option_detail'>[]>([]);

  useEffect(() => {
    return () => {
      setSelectedDetail([]);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h3>{option.name}</h3>
      <div>
        {option.menu_option_detail.map(detail => (
          <OptionDetailRow
            key={detail.id}
            option={option}
            detail={detail}
            selectedDetail={selectedDetail}
            setSelectedDetail={setSelectedDetail}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionRow;
