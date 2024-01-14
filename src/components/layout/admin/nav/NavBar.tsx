import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/AdminLayout.module.css';

const NavBar = (adminInfo: AdminCategories) => {
  const [navList, setNavList] = useState(adminInfo.adminCategories);

  const clickNavListHandler = (id: number) => {
    setNavList(prevList =>
      prevList.map(item => (item.id === id ? { ...item, active: !item.active } : { ...item, active: false })),
    );
  };

  return (
    <aside className={styles.navWrapper}>
      <ul>
        {navList.map(list => (
          <li className={list.active ? styles.active : ''} key={list.id} onClick={() => clickNavListHandler(list.id)}>
            <Link href={list.url}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NavBar;
