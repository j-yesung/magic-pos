import { useFetchQuery } from '@/hooks/query/store/useFetchQuery';
import useAuthState from '@/shared/store/session';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  const storeId = useAuthState(state => state.storeId);
  const { storeInfo } = useFetchQuery({ storeId: storeId ?? '' });
  const isUseTable = storeInfo?.use_table;
  const [filteredNavList, setFilteredNavList] = useState(navList);
  const router = useRouter();
  const currentPath = router.asPath;

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
        <li
          className={currentPath === list.url ? styles.active : ''}
          key={list.id}
          onClick={() => clickFn(list.id, list.url)}
        >
          {list.name}
        </li>
      ))}
    </>
  );
};

export default React.memo(SidebarList);
