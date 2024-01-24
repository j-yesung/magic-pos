import useTableStore from '@/shared/store/table';
import styles from '../styles/AdminLayout.module.css';

const TABLE_MANAGEMENT_NUMBER = 4;

interface NavListType {
  id: number;
  name: string;
  url: string;
  active: boolean;
}

interface NavList {
  navList: NavListType[];
  clickFn: (id: number, url: string) => void;
}

const SidebarList = ({ navList, clickFn }: NavList) => {
  const isUseTable = useTableStore(state => state.isUseTable);
  const isUse = Boolean(isUseTable);

  if (isUse) navList = navList.filter(list => list.id !== TABLE_MANAGEMENT_NUMBER);

  return (
    <>
      {navList.map(list => (
        <li className={list.active ? styles.active : ''} key={list.id} onClick={() => clickFn(list.id, list.url)}>
          {list.name}
        </li>
      ))}
    </>
  );
};

export default SidebarList;
