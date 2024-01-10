import styles from '@/components/layout/admin/styles/AdminLayout.module.css';
import useToggleStore from '@/shared/store/toggle';

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
