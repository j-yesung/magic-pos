import 'moment/locale/ko';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
/**
 * @example clone()을 해준 이유는 원본을 훼손하지 않기 위해서입니다.
 */

const Calendar = () => {
  return (
    <>
      <Header />
      <Days />
      <Cell />
    </>
  );
};

export default Calendar;
