import { Moment } from 'moment';
import 'moment/locale/ko';
import Cell from './body/Cell';
import Days from './days/Days';
import Header from './header/Header';

/**
 *
 * @example clone()을 해준 이유는 원본을 훼손하지 않기 위해서입니다.
 */

interface Props {
  isShow: boolean;
  currentMonth: Moment;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Moment>>;
}
const Calendar = ({ isShow, currentMonth, setCurrentMonth }: Props) => {
  const clickPreMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };
  const clickNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  return (
    <div style={{ display: isShow ? 'grid' : 'none', gap: '1rem', padding: '1rem' }}>
      <Header currentMonth={currentMonth} clickPreMonth={clickPreMonth} clickNextMonth={clickNextMonth} />
      <Days />
      <Cell currentMonth={currentMonth} />
    </div>
  );
};

export default Calendar;
