import styles from '@/components/layout/admin/styles/AdminLayout.module.css';
import { useState } from 'react';

const HeaderToggleButton = () => {
  const [, setIsToggle] = useState(false);

  const clickToggleHandler = () => {
    setIsToggle(prev => !prev);
  };

  return (
    <div>
      <input className={styles.toggle} type="checkbox" id="toggle" onChange={clickToggleHandler} hidden />
      <label className={styles.label} htmlFor="toggle" />
    </div>
  );
};

export default HeaderToggleButton;
