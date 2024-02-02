import { useFetchQuery } from '@/hooks/query/store/useFetchQuery';
import { useStoreSetQuery } from '@/hooks/query/store/useStoreSetQuery';
import useAuthState from '@/shared/store/session';
import Select from 'react-select';
import styles from '../styles/StoreContents.module.css';
import { customStyles } from './StoreSelectBox';

const OPTION_TRUE = { value: 'true', label: '사용' };
const OPTION_FALSE = { value: 'false', label: '미사용' };
const OPTIONS = [OPTION_TRUE, OPTION_FALSE];

const ConfirmTable = () => {
  const storeId = useAuthState(state => state.storeId);
  const { updateStoreUseTable } = useStoreSetQuery();
  const { storeInfo, refetch } = useFetchQuery({ storeId: storeId ?? '' });
  const isUseTable = storeInfo?.use_table;

  const changeTableStatusHandler = async (selectedValue: string) => {
    if (storeId) {
      const useTable = selectedValue === 'true';
      await updateStoreUseTable({ storeId, useTable });
      refetch();
    }
  };

  return (
    <div className={styles.tableSelectBox}>
      <label htmlFor="confirm-table">테이블 사용 여부</label>
      <Select
        id="confirm-table"
        styles={customStyles}
        defaultValue={isUseTable ? OPTION_TRUE : OPTION_FALSE}
        options={OPTIONS}
        onChange={select => changeTableStatusHandler(select?.value ?? '')}
      />
    </div>
  );
};

export default ConfirmTable;
