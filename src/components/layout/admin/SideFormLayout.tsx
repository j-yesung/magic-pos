import useSideFormState from '@/shared/store/side-form';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styles from './styles/SideFormLayout.module.css';
import CloseButton from '/public/icons/close.svg';

const SideFormLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSideFormOpen, setIsSideFormOpen } = useSideFormState();
  const targetRef = useRef<HTMLDivElement>(null);
  const sidebarClass = clsx(styles.navWrapper, {
    [styles.closeNav]: !isSideFormOpen,
  });

  useEffect(() => {
    const closeSideBar = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        setIsSideFormOpen(false);
      }
    };

    window.addEventListener('mousedown', closeSideBar);

    return () => {
      window.removeEventListener('mousedown', closeSideBar);
    };
  }, [setIsSideFormOpen]);
  return (
    <aside className={sidebarClass} ref={targetRef}>
      <div className={styles.contents}>
        <div className={styles.closeButton}>
          <CloseButton width={40} height={40} onClick={() => setIsSideFormOpen(false)} />
        </div>
        <div className={styles.inner}>{children}</div>
      </div>
    </aside>
  );
};

export default SideFormLayout;
