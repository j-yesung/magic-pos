import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import HeaderController from './calendarController/HeaderController';
import HeaderDate from './headerDate/HeaderDate';
import styles from './styles/header.module.css';
const Header = () => {
  const isChangeView = useSalesStore(state => state.isChangeView);

  return (
    <div className={clsx(styles.headerContainer, isChangeView ? styles.statusHeader : styles.calendarHeader)}>
      <HeaderDate />
      <HeaderController />
    </div>
  );
};

export default Header;
