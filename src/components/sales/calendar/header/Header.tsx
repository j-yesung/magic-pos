import clsx from 'clsx';

import { CalendarModeType } from '@/types/calendar';
import { BIG_MODE, MINI_MODE } from '../calendarType/calendarType';
import HeaderController from './calendarController/HeaderController';
import HeaderDate from './headerDate/HeaderDate';
import styles from './styles/header.module.css';
const Header = ({ mode }: { mode: CalendarModeType }) => {
  return (
    <div
      className={clsx(styles.baseHeader, {
        [styles.miniHeader]: mode === MINI_MODE,
        [styles.bigHeader]: mode === BIG_MODE,
      })}
    >
      <HeaderDate mode={mode} />
      <HeaderController mode={mode} />
    </div>
  );
};

export default Header;
