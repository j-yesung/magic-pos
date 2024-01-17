import { modeSubText, modeText } from '@/data/admin';
import { useAuth } from '@/hooks/auth/useAuth';
import useSideBar from '@/shared/store/sidebar';
import useToggleState from '@/shared/store/toggle';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import HeaderToggleButton from '../header/HeaderToggleButton';
import styles from '../styles/AdminLayout.module.css';
import SidebarList from './SidebarList';
import CloseButton from '/public/icons/close.svg';
import Ellipse from '/public/icons/ellipse.svg';

const Sidebar = (adminInfo: AdminCategories) => {
  const [navList, setNavList] = useState(adminInfo.adminCategories);
  const { isSideBarOpen, setIsSideBarOpen } = useSideBar();
  const isMode = useToggleState(state => state.isChecked);
  const targetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuth();
  const sidebarClass = clsx(styles.navWrapper, {
    [styles.closeNav]: !isSideBarOpen,
  });

  const clickNavListHandler = useCallback(
    (id: number, url: string) => {
      const currentActive = navList.find(item => item.active === true);
      if (currentActive && currentActive.id === id) return;

      setNavList(prevList =>
        prevList.map(item => (item.id === id ? { ...item, active: !item.active } : { ...item, active: false })),
      );

      router.push(url);
      setIsSideBarOpen(false);
    },
    [navList, router, setIsSideBarOpen],
  );

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
    <aside className={sidebarClass} ref={targetRef}>
      <div className={styles.contents}>
        <div className={styles.closeButton}>
          <CloseButton width={40} height={40} onClick={() => setIsSideBarOpen(false)} />
        </div>
        <div className={styles.toggleButton}>
          <HeaderToggleButton />
        </div>
        <div className={styles.notification}>
          <Ellipse width={8} height={8} />
          {isMode ? modeText[0] : modeText[1]}
        </div>
        <p>{isMode ? modeSubText[0] : modeSubText[1]}</p>
        <ul>
          <SidebarList navList={navList} clickFn={clickNavListHandler} />
        </ul>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.callButton}>문의하기</button>
        <p>|</p>
        <button className={styles.logoutButton} onClick={() => logout()}>
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
