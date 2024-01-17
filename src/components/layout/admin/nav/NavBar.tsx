import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/AdminLayout.module.css';

const NavBar = (adminInfo: AdminCategories) => {
  const [navList, setNavList] = useState(adminInfo.adminCategories);
  const router = useRouter();

  const clickNavListHandler = (id: number, url: string) => {
    // 현재 active 상태인 list는 클릭해도 반응하지 않습니다.
    const currentActive = navList.find(item => item.active === true);
    if (currentActive && currentActive.id === id) return;

    setNavList(prevList =>
      prevList.map(item => (item.id === id ? { ...item, active: !item.active } : { ...item, active: false })),
    );

    router.push(url);
  };

  return (
    <aside className={styles.navWrapper}>
      <div className={styles.notification}>
        <Ellipse width={8} height={8} />
        현재 관리자 모드를 보고있습니다.
      </div>
      <p>※ 운영 모드를 이용하려면 토글 버튼을 클릭해 주세요.</p>
      <ul>
        {navList.map(list => (
          <li
            className={list.active ? styles.active : ''}
            key={list.id}
            onClick={() => clickNavListHandler(list.id, list.url)}
          >
            {list.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NavBar;
