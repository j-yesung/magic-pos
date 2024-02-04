import clsx from 'clsx';
import HeaderController from './calendarController/HeaderController';
import HeaderDate from './headerDate/HeaderDate';
import styles from './styles/header.module.css';
const Header = ({ mode }: { mode: 'mini' | 'big' }) => {
  return (
    <div
      className={clsx(styles.headerContainer, {
        [styles.statusHeader]: mode === 'mini',
        [styles.calendarHeader]: mode === 'big',
      })}
    >
      <HeaderDate mode={mode} />
      <HeaderController mode={mode} />
    </div>
  );
};

export default Header;
