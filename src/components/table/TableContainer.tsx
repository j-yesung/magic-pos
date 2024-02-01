import useSetTable from '@/hooks/table/useSetTable';
import { StoreWithStoreTable, Tables, TablesInsert } from '@/types/supabase';
import TableListItem from './TableListItem';
import styles from './styles/TableContainer.module.css';
import PlusButton from '/public/icons/plus.svg';

const TableContainer = ({ storeData }: { storeData: StoreWithStoreTable[] }) => {
  const { addMutate } = useSetTable();
  const tableIdInOrderStore = storeData?.[0]?.order_store.map(order => order.table_id);
  const tablePosition = storeData?.[0]?.store_table.map(table => table.position);
  /**
   * position값중 가장 큰수 추출
   */
  const maxPosition =
    tablePosition.length === 0
      ? 0
      : tablePosition.reduce((prev, value) => {
          return prev! >= value! ? prev : value;
        });

  const clickAddStoreTableHandler = () => {
    /**
     * 총테이블 중 빈테이블 번호 찿기
     */
    const notTable = [];
    for (let i = 0; i < maxPosition!; i++) {
      if (i !== 0 && notTable.length < 1 && !tablePosition.includes(i)) notTable.push(i);
    }
    /**
     * store_table에 insert할때 필요한 데이터
     * 테이블 이 없으면 테이블 번호 1
     * 테이블이 있으면 테이블 번호 중 가장큰번호 + 1
     * 중간에 테이블번호가 비어있으면 비어있는 테이블 번호부터 등록
     */
    const newStoreTableData: TablesInsert<'store_table'> = {
      is_disabled: 0,
      max_guest: 4,
      position: maxPosition === 0 ? 1 : notTable.length !== 0 ? notTable[0] : maxPosition! + 1,
      store_id: storeData?.[0]?.id,
    };

    if (storeData?.[0]?.id) {
      addMutate(newStoreTableData);
    }
  };
  return (
    <div className={styles['table-container']}>
      {storeData?.[0]?.store_table
        .sort((a, b) => {
          if (a.position && b.position) {
            return a.position < b.position ? -1 : 1;
          }
          return 0;
        })
        .map((item: Tables<'store_table'>) => {
          return <TableListItem key={item.id} storeTableData={item} tableIdInOrderStore={tableIdInOrderStore} />;
        })}
      <div className={styles['table-list-button']} onClick={clickAddStoreTableHandler}>
        <PlusButton width="41" height="41" />
      </div>
    </div>
  );
};

export default TableContainer;
