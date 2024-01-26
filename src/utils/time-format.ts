const TIME_SIZE = 48;

// 시간 설정 범위
export const timeSet = [
  { id: 1, name: 'startTime', defaultValue: '오픈', label: '부터' },
  { id: 2, name: 'endTime', defaultValue: '마감', label: '까지' },
];

// 시간 포맷 변환
export const convertTimeFormat = (time: string) => {
  const [hour, minute] = time.split(':');
  const hourNumber = Number(hour);
  const prefix = hourNumber >= 12 ? '오후' : '오전';
  const convertedHour = hourNumber > 12 ? hourNumber - 12 : hourNumber === 0 ? 12 : hourNumber;

  return {
    originalTime: time,
    convertedTime: `${prefix} ${convertedHour}:${minute}`,
  };
};

// 셀렉트 옵션 생성
export const createTimeOptions = (timeArray: string[]) =>
  timeArray.map(t => ({
    value: t,
    label: convertTimeFormat(t).convertedTime,
  }));

// 셀렉트 옵션
export const timeOption = Array.from(
  { length: TIME_SIZE },
  (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${String((i % 2) * 30).padStart(2, '0')}:00`,
);
