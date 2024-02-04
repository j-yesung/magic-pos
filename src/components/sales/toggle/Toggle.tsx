import React from 'react';
import styles from './styles/toggle.module.css';
import Tab from './tab/Tab';
import ToggleButton from './toggleButton/ToggleButton';
const Toggle = () => {
  return (
    <div className={styles.toggleWrapper}>
      <Tab />
      <ToggleButton />
    </div>
  );
};

export default React.memo(Toggle);
