const Days = () => {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return (
    <div className="days" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1rem' }}>
      {days.map(day => (
        <span key={day} className="day">
          {day}
        </span>
      ))}
    </div>
  );
};

export default Days;
