import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/AdminLayout.module.css';

const NavBar = () => {
  const [navList, setNavList] = useState([
    { id: 1, name: '주문 내역 확인', url: '#1', active: false },
    { id: 2, name: '매출 관리', url: '/admin/sales/status', active: true },
    { id: 3, name: '플랫폼 관리', url: '#3', active: false },
    { id: 4, name: '테이블 관리', url: '/admin/table', active: true },
    { id: 5, name: '메뉴 관리', url: '#5', active: false },
    { id: 6, name: '가게 설정', url: '/admin/store', active: false },
  ]);

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
