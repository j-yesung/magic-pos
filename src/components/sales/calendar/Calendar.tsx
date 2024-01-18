import 'moment/locale/ko';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
/**
 * @example clone()을 해준 이유는 원본을 훼손하지 않기 위해서입니다.
 */

const Calendar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Days />
      <Cell />
    </>
  );
};

export default Calendar;
