import { useToggle } from '@/hooks/service/ui/useToggle';
import useToggleState from '@/shared/store/toggle';
import styles from '../styles/AdminLayout.module.css';

const HeaderToggleButton = () => {
  const isChecked = useToggleState(state => state.isChecked);
  const { changeToggleHandler } = useToggle();

  return (
    <>
      <input className={styles.toggle} type="checkbox" id="toggle" checked={isChecked} onChange={changeToggleHandler} />
      <label className={styles.label} htmlFor="toggle" />
    </>
  );
};

export default HeaderToggleButton;
