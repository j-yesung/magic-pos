import { useEffect, useState } from 'react';
import { MenuOptionWithDetail, Tables } from '@/types/supabase';
import styles from './styles/OptionRow.module.css';
import OptionDetailRow from '@/components/kiosk/menu-option/OptionDetailRow';
import { useTranslation } from 'next-i18next';
import useKioskState from '@/shared/store/kiosk';

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
  const selectedLanguage = useKioskState(state => state.selectedLanguage);
  const { t } = useTranslation();

  const maxOptionMessage: { [key: string]: string } = {
    'lang-ko': `(${t('max')} ${option.max_detail_count}${t('max-available-option')})`,
    'lang-en': `(${t('max-available-option')} ${option.max_detail_count})`,
  };

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
            <span className={styles.maxOptionAmount}>{maxOptionMessage[selectedLanguage]}</span>
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
