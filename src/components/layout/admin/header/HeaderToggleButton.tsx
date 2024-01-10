import styles from '@/components/layout/admin/styles/AdminLayout.module.css';
import useToggleStore from '@/shared/store/toggle';

const HeaderToggleButton = () => {
  const { changeToggle } = useToggleStore();

  return (
    <>
      <input className={styles.toggle} type="checkbox" id="toggle" onChange={changeToggle} hidden />
      <label className={styles.label} htmlFor="toggle" />
    </>
  );
};

export default HeaderToggleButton;
