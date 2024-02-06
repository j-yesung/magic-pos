import useFetchTable from '@/hooks/query/table/useFetchTable';
import useAuthState from '@/shared/store/session';
import TableContainer from './TableContainer';
import styles from './styles/Table.module.css';

const Table = () => {
  const { session } = useAuthState();
  const { data } = useFetchTable({ userId: session?.user.id });

  return <div className={styles['table-wrapper']}>{data && <TableContainer storeData={data} />}</div>;
};

export default Table;
