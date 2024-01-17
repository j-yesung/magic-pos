import useSideBar from '@/shared/store/sidebar';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/AdminLayout.module.css';
import CloseButton from '/public/icons/close.svg';
import Ellipse from '/public/icons/ellipse.svg';

const NavBar = (adminInfo: AdminCategories) => {
  const [navList, setNavList] = useState(adminInfo.adminCategories);
  const { isSideBarOpen, setIsSideBarOpen } = useSideBar();
  const targetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const clickNavListHandler = (id: number, url: string) => {
    const currentActive = navList.find(item => item.active === true);
    if (currentActive && currentActive.id === id) return;

    setNavList(prevList =>
      prevList.map(item => (item.id === id ? { ...item, active: !item.active } : { ...item, active: false })),
    );

    router.push(url);
  };

  useEffect(() => {
    const closeSideBar = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        setIsSideBarOpen(false);
      }
    };

    window.addEventListener('mousedown', closeSideBar);

    return () => {
      window.removeEventListener('mousedown', closeSideBar);
    };
  }, [setIsSideBarOpen]);

  return (
    <aside className={`${styles.navWrapper} ${isSideBarOpen ? '' : styles.closeNav}`} ref={targetRef}>
      <div className={styles.closeButton}>
        <CloseButton width={40} height={40} />
      </div>
      <div className={styles.toggleButton}>{/* <HeaderToggleButton /> */}</div>
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
      <div>
        <button className={styles.logoutButton}>로그아웃</button>
      </div>
    </aside>
  );
};

export default NavBar;
