import { useFetchQuery } from '@/hooks/query/store/useFetchQuery';
import { Fragment, useEffect, useState } from 'react';
import { convertTimeFormat, timeSet } from '../../../utils/time-format';
import styles from '../styles/StoreContents.module.css';
import StoreSelectBox from './StoreSelectBox';
import StoreSetButton from './StoreSetButton';

const StoreTimeSet = ({ userId }: { userId: string }) => {
  const { data } = useFetchQuery({ userId });
  const [times, setTimes] = useState<TimeState>({ startTime: '', endTime: '' });
  const openTime = convertTimeFormat(times.startTime).convertedTime;
  const closeTime = convertTimeFormat(times.endTime).convertedTime;
  const isTimeSet = times.startTime === '' || times.endTime === '';

  // DB 영업시간 불러오기
  useEffect(() => {
    if (data) {
      setTimes({
        startTime: data[0].start_time ?? '',
        endTime: data[0].end_time ?? '',
      });
    }
  }, [data]);

  return (
    <>
      <div className={styles.timesetContainer}>
        <label htmlFor="time">영업시간</label>
        <div className={styles.timeSelectBox}>
          {data && data?.length > 0 && (
            <>
              {timeSet.map(item => (
                <Fragment key={item.id}>
                  <StoreSelectBox item={item} times={times} setTimes={setTimes} />
                  <span>{item.label}</span>
                </Fragment>
              ))}
            </>
          )}
        </div>
        <StoreSetButton times={times} userId={userId} />
      </div>
      <div>
        <p className={styles.timeCaption}>
          {isTimeSet ? (
            '영업시간을 선택해 주세요.'
          ) : (
            <>
              영업시간은 현재 <strong>{`${openTime} ~ ${closeTime}`}</strong> 까지입니다.
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default StoreTimeSet;
