import { useState } from 'react';
import styles from '../styles/AdminLayout.module.css';

const NavBar = () => {
  const [navList, setNavList] = useState([
    { id: 1, name: '주문 내역 확인', active: false },
    { id: 2, name: '매출 관리', active: false },
    { id: 3, name: '플랫폼 관리', active: false },
    { id: 4, name: '테이블 관리', active: true },
    { id: 5, name: '메뉴 관리', active: false },
    { id: 6, name: '가게 설정', active: false },
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
            <span>{list.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NavBar;
