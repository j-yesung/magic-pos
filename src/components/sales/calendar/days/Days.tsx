import styles from './styles/days.module.css';
const Days = () => {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  console.log('111');
  return (
    <div className={styles.days}>
      {days.map(day => (
        <span key={day}>{day}</span>
      ))}
    </div>
  );
};

export default Days;
