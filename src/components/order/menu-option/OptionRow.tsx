import React, { useEffect, useState } from 'react';
import { MenuOptionWithDetail, Tables } from '@/types/supabase';
import styles from './styles/OptionRow.module.css';
import OptionDetailRow from '@/components/order/menu-option/OptionDetailRow';

/**
 * -- 로직 설명
 * 각 옵션에는 여러 개의 Detail이 있고, 옵션에는 선택할 수 있는 Detail 개수가 정해져 있다.
 * 따라서 하나의 옵션마다 각각의 selectedDetail을 가진다.
 * 뒤로가기, 장바구니 담기시 selectedDetail은 초기화 되어야 한다.
 * @param option
 * @constructor
 */
const OptionRow = ({ option }: { option: MenuOptionWithDetail }) => {
  const [selectedDetail, setSelectedDetail] = useState<Tables<'menu_option_detail'>[]>([]);

  useEffect(() => {
    return () => {
      setSelectedDetail([]);
    };
  }, []);

  return (
    <>
      {option.menu_option_detail.length > 0 && (
        <div className={styles.container}>
          <div className={styles.optionTitle}>
            <h3>{option.name}</h3>
            <span className={styles.maxOptionAmount}>(최대 {option.max_detail_count}개 선택 가능)</span>
          </div>
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
      )}
    </>
  );
};

export default OptionRow;
