import clsx from 'clsx';
import { BIG_MODE, MINI_MODE } from '../calendarType/calendarType';
import HeaderController from './calendarController/HeaderController';
import HeaderDate from './headerDate/HeaderDate';
import styles from './styles/header.module.css';
const Header = ({ mode }: { mode: CalendarModeType }) => {
  return (
    <div
      className={clsx(styles.headerContainer, {
        [styles.statusHeader]: mode === MINI_MODE,
        [styles.calendarHeader]: mode === BIG_MODE,
      })}
    >
      <HeaderDate mode={mode} />
      <HeaderController mode={mode} />
    </div>
  );
};

export default Header;
