import useTableStore from '@/shared/store/table';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import styles from './styles/TableListItem.module.css';

const TableListItem = ({ storeTableData, index }: { storeTableData: Tables<'store_table'>; index: number }) => {
  const { TableItemClick, refSideBar, refDummySideBar, refSideBarBg } = useTableStore();

  const clickTableItemHandler = () => {
    if (storeTableData) {
      TableItemClick({
        tableId: storeTableData.id,
        tableNumber: storeTableData.position,
        maxGuest: storeTableData.max_guest,
        isDisabled: storeTableData.is_disabled,
      });
      refSideBar?.current?.style.setProperty('right', '0');
      refDummySideBar?.current?.style.setProperty('width', '19.4%');
      refSideBarBg?.current?.style.setProperty('visibility', 'visible');
      refSideBarBg?.current?.style.setProperty('opacity', '50%');
    }
  };
  return (
    <div
      className={clsx(styles['table-list-item'], index % 5 === 4 && styles['item-row-5'])}
      onClick={clickTableItemHandler}
    >
      <span className={styles['list-text']}>테이블{storeTableData.position}</span>
      <span className={styles['list-text-hover']}>상세보기</span>
    </div>
  );
};

export default TableListItem;
