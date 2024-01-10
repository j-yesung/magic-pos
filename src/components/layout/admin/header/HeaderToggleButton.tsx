import useToggleStore from '@/shared/store/toggle';
import styles from '../styles/AdminLayout.module.css';

const HeaderToggleButton = () => {
  const { isToggle, changeToggle } = useToggleStore();

  return (
    <>
      <input className={styles.toggle} type="checkbox" id="toggle" onChange={changeToggle} defaultChecked={isToggle} />
      <label className={styles.label} htmlFor="toggle" />
    </>
  );
};

export default HeaderToggleButton;
