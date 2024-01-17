import React from 'react';
import styles from '../styles/AdminLayout.module.css';

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
