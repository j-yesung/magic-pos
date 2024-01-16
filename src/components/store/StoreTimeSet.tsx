import { useGetQuery } from '@/hooks/store/useGetQuery';
import { useStoreQuery } from '@/hooks/store/useStoreQuery';
import { Fragment, useEffect, useState } from 'react';
import Button from '../common/Button';
import styles from './styles/StroeContents.module.css';

const TIME_SIZE = 48;

type TimeState = Record<string, string>;

const StoreTimeSet = ({ userId }: { userId: string }) => {
  const { updateStoreTimeSet } = useStoreQuery();
  const { data } = useGetQuery(userId);
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
    { id: 1, name: 'startTime', label: '오픈' },
    { id: 2, name: 'endTime', label: '마감' },
  ];

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
        <label htmlFor="tiem">영업 시간</label>
        <div className={styles.timeSelectBox}>
          {timeSet.map(item => (
            <Fragment key={item.id}>
              {data && data?.length > 0 && (
                <>
                  <span>{item.label}</span>
                  <select name={item.name} id={item.name} onChange={changeTimeHandler} value={times[item.name]}>
                    {time
                      .filter(t => (item.name === 'endTime' ? t > times.startTime : true))
                      .map((t, index) => (
                        <option key={index} value={t}>
                          {t}
                        </option>
                      ))}
                  </select>
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <Button type="button" onClick={clickUpdateStoreHandler}>
        등록하기
      </Button>
    </>
  );
};

export default StoreTimeSet;
