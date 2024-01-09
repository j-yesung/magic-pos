import { Moment } from 'moment';

interface Props {
  currentMonth: Moment;
  clickPreMonth: () => void;
  clickNextMonth: () => void;
}
const Header = ({ currentMonth, clickPreMonth, clickNextMonth }: Props) => {
  return (
    <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="wrapper">
        <span className="text" style={{ display: 'flex', gap: '1rem' }}>
          <span className="text-year">{currentMonth.clone().format('YYYY')}</span>
          {currentMonth.clone().format('MMMM')}
        </span>
      </div>
      <div className="btn-group">
        <span className="left-btn" style={{ display: 'inline-block', marginRight: '10px' }} onClick={clickPreMonth}>
          이전
        </span>
        <span className="right-btn" onClick={clickNextMonth}>
          다음
        </span>
      </div>
    </div>
  );
};

export default Header;
