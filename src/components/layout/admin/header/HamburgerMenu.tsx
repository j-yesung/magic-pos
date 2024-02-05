import { useToggle } from '@/hooks/service/ui/useToggle';
import { toggleIsSideBarOpen } from '@/shared/store/sidebar';
import useToggleState from '@/shared/store/toggle';
import React from 'react';
import styles from '../styles/AdminLayout.module.css';
import Hamburger from '/public/icons/hamburger.svg';

const HamburgerMenu = () => {
  const isChecked = useToggleState(state => state.isChecked);
  const { changeToggleHandler } = useToggle();

  const clickSideBarOpenHandler = () => {
    toggleIsSideBarOpen();

    if (!isChecked) {
      return;
    } else {
      changeToggleHandler();
    }
  };

  return (
    <div onClick={clickSideBarOpenHandler}>
      <Hamburger className={styles.hamburger} width={'3rem'} height={'3rem'} />
    </div>
  );
};

export default React.memo(HamburgerMenu);
