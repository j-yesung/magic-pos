import useTableStore from '@/shared/store/table';
import { useEffect, useState } from 'react';
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
  const [filteredNavList, setFilteredNavList] = useState(navList);
  const isUseTable = useTableStore(state => state.isUseTable);

  useEffect(() => {
    if (isUseTable) {
      setFilteredNavList(navList);
    } else {
      setFilteredNavList(navList.filter(list => list.id !== TABLE_MANAGEMENT_NUMBER));
    }
  }, [isUseTable, navList]);

  return (
    <>
      {filteredNavList.map(list => (
        <li className={list.active ? styles.active : ''} key={list.id} onClick={() => clickFn(list.id, list.url)}>
          {list.name}
        </li>
      ))}
    </>
  );
};

export default SidebarList;
