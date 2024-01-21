import { useGetQuery } from '@/hooks/store/useGetQuery';
import { useStoreQuery } from '@/hooks/store/useStoreQuery';
import { Fragment, useEffect, useState } from 'react';
import Button from '../common/Button';
import styles from './styles/StroeContents.module.css';

const TIME_SIZE = 48;

type TimeState = Record<string, string>;

const StoreTimeSet = ({ userId }: { userId: string }) => {
  const { updateStoreTimeSet } = useStoreQuery();
  const { data } = useGetQuery({ userId });
  const [times, setTimes] = useState<TimeState>({ startTime: '', endTime: '' });

  useEffect(() => {
    if (data) {
      setTimes({
        startTime: data[0].start_time ?? '',
        endTime: data[0].end_time ?? '',
      });
    }
  }, [data]);

  // 24시간 30분 단위로 시간을 표시
  const time = Array.from(
    { length: TIME_SIZE },
    (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${String((i % 2) * 30).padStart(2, '0')}:00`,
  );

  const timeSet = [
    { id: 1, name: 'startTime', label: '부터' },
    { id: 2, name: 'endTime', label: '까지' },
  ];

  const convertTimeFormat = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNumber = Number(hour);
    const prefix = hourNumber >= 12 ? '오후' : '오전';
    const convertedHour = hourNumber > 12 ? hourNumber - 12 : hourNumber === 0 ? 12 : hourNumber;

    return {
      originalTime: time,
      convertedTime: `${prefix} ${convertedHour}:${minute}`,
    };
  };

  const clickUpdateStoreHandler = () => {
    updateStoreTimeSet({ userId, ...times });
  };

  const changeTimeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimes({
      ...times,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className={styles.timesetContainer}>
        <label htmlFor="tiem">영업시간</label>
        <div className={styles.timeSelectBox}>
          {timeSet.map(item => (
            <Fragment key={item.id}>
              {data && data?.length > 0 && (
                <>
                  <select name={item.name} id={item.name} onChange={changeTimeHandler} value={times[item.name]}>
                    {time
                      .filter(t => (item.name === 'endTime' ? t > times.startTime : true))
                      .map((t, index) => (
                        <option key={index} value={t}>
                          {convertTimeFormat(t).convertedTime}
                        </option>
                      ))}
                  </select>
                  <span>{item.label}</span>
                </>
              )}
            </Fragment>
          ))}
        </div>
        <Button type="button" onClick={clickUpdateStoreHandler} className={styles.buttonBlankArea}>
          수정
        </Button>
      </div>
      <p className={styles.timeCaption}>
        현재 {convertTimeFormat(times.startTime).convertedTime} 부터 {convertTimeFormat(times.endTime).convertedTime}
        까지로 영업시간이 설정되었습니다.
      </p>
    </>
  );
};

export default StoreTimeSet;
