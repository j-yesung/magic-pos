import useSideFormState from '@/shared/store/side-form';
import useSideBarState from '@/shared/store/sidebar';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styles from './styles/SideFormLayout.module.css';
import CloseButton from '/public/icons/close.svg';

const SideFormLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSideFormOpen, setIsSideFormOpen } = useSideFormState();
  const { isSideBarOpen } = useSideBarState();
  const targetRef = useRef<HTMLDivElement>(null);
  const sidebarClass = clsx(styles.navWrapper, {
    [styles.closeNav]: !isSideFormOpen,
  });

  useEffect(() => {
    setIsSideFormOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSideBarOpen]);
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
