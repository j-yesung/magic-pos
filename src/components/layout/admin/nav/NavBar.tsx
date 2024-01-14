import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/AdminLayout.module.css';

const NavBar = (adminInfo: AdminCategories) => {
  const [navList, setNavList] = useState(adminInfo.adminCategories);
  const router = useRouter();

  const clickNavListHandler = (id: number, url: string) => {
    setNavList(prevList =>
      prevList.map(item => (item.id === id ? { ...item, active: !item.active } : { ...item, active: false })),
    );

    router.push(url);
  };

  return (
    <aside className={styles.navWrapper}>
      <ul>
        {navList.map(list => (
          <li className={list.active ? styles.active : ''} key={list.id}>
            <button onClick={() => clickNavListHandler(list.id, list.url)}>{list.name}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NavBar;
