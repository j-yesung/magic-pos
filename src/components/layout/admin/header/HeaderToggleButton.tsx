import styles from '@/components/layout/admin/header/styles/Header.module.css';
import { useState } from 'react';

const HeaderToggleButton = () => {
  const [, setIsToggle] = useState(false);

  const clickToggleHandler = () => {
    setIsToggle(prev => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <input className={styles.toggle} type="checkbox" id="toggle" onChange={clickToggleHandler} hidden />
      <label className={styles.label} htmlFor="toggle" />
    </div>
  );
};

export default HeaderToggleButton;
