import { useGetQuery } from '@/hooks/store/useGetQuery';
import { useStoreQuery } from '@/hooks/store/useStoreQuery';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Button from '../common/Button';
import { convertTimeFormat, timeSet } from '../utils/time-format';
import StoreSelectBox from './StoreSelectBox';
import styles from './styles/StroeContents.module.css';

export type TimeState = Record<string, string>;

const StoreTimeSet = ({ userId }: { userId: string }) => {
  const { data } = useGetQuery({ userId });
  const { updateStoreTimeSet } = useStoreQuery();
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

  // DB 영업시간 변경
  const clickUpdateStoreHandler = useCallback(() => {
    updateStoreTimeSet({ userId, ...times });
  }, [times, updateStoreTimeSet, userId]);

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
        <Button type="button" onClick={clickUpdateStoreHandler} className={styles.buttonBlankArea}>
          수정
        </Button>
      </div>
      <p className={styles.timeCaption}>
        {isTimeSet
          ? '영업시간을 선택해 주세요.'
          : `현재 ${openTime} 부터 ${closeTime}
        까지로 영업시간이 설정되었습니다.`}
      </p>
    </>
  );
};

export default StoreTimeSet;
