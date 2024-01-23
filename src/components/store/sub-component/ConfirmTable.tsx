import { useState } from 'react';
import Select from 'react-select';
import styles from '../styles/StroeContents.module.css';
import { customStyles } from './StoreSelectBox';

const OPTIONS = [
  { value: 'true', label: '사용' },
  { value: 'false', label: '미사용' },
];

const ConfirmTable = () => {
  const [isTable, setIsTable] = useState('true');

  const changeTableStatusHandler = (selectedValue: string) => {
    setIsTable(selectedValue);
  };

  return (
    <div className={styles.tableSelectBox}>
      <label htmlFor="confirm-table">테이블 사용 여부</label>
      <Select
        id="confirm-table"
        styles={customStyles}
        value={OPTIONS.find(option => option.value === isTable)}
        options={OPTIONS}
        onChange={select => changeTableStatusHandler(select?.value ?? '')}
      />
    </div>
  );
};

export default ConfirmTable;
