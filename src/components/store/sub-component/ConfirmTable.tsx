import { useFetchQuery } from '@/hooks/query/store/useFetchQuery';
import { useStoreSetQuery } from '@/hooks/query/store/useStoreSetQuery';
import useAuthState from '@/shared/store/session';
import { setIsUseTable } from '@/shared/store/table';
import { useState } from 'react';
import Select from 'react-select';
import styles from '../styles/StroeContents.module.css';
import { customStyles } from './StoreSelectBox';

const OPTION_TRUE = { value: 'true', label: '사용' };
const OPTION_FALSE = { value: 'false', label: '미사용' };
const OPTIONS = [OPTION_TRUE, OPTION_FALSE];

/**
 * value, label은 Select 컴포넌트에서 사용하는 속성입니다.
 * Select 라이브러리는 무조건 [key: string]: string 쌍으로 값을 받아야 합니다.
 * @returns 테이블 사용 여부를 선택하는 Select 컴포넌트
 */
const ConfirmTable = () => {
  const storeId = useAuthState(state => state.storeId);
  const { updateStoreUseTable } = useStoreSetQuery();
  const { storeInfo } = useFetchQuery({ storeId: storeId ?? '' });
  const [isUseTableState, setIsUseTableState] = useState(() => storeInfo?.use_table);

  const changeTableStatusHandler = (selectedValue: string) => {
    if (storeId) {
      const useTable = selectedValue === 'true';
      setIsUseTable(useTable ? true : false); // sidebar 상태 변경을 위한 전역 상태 변경
      setIsUseTableState(useTable ? true : false); // 현재 페이지 상태 변경을 위한 지역 상태 변경
      updateStoreUseTable({ storeId, useTable }); // 서버로 변경된 상태 반영
    }
  };

  return (
    <div className={styles.tableSelectBox}>
      <label htmlFor="confirm-table">테이블 사용 여부</label>
      <Select
        id="confirm-table"
        styles={customStyles}
        value={isUseTableState ? OPTION_TRUE : OPTION_FALSE}
        options={OPTIONS}
        onChange={select => changeTableStatusHandler(select?.value ?? '')}
      />
    </div>
  );
};

export default ConfirmTable;
