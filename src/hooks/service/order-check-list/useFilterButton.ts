import useOrderCheckListStore from '@/shared/store/order-check-list';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import useFetchOrderCheckList from '../../query/order-check-list/useFetchOrderCheckList';

const useFilterButton = () => {
  const [isDateButton, setIsDateButton] = useState(0);
  const { setListType, setStartTime, setEndTime, setIsShowStartCalender, setIsShowEndCalender } =
    useOrderCheckListStore();
  const { refetch } = useFetchOrderCheckList();

  const clickFilterButtonHandler = (listType: string, styleType: number, isRefetch: boolean) => {
    setListType(listType);
    setIsDateButton(styleType);
    if (isRefetch) {
      refetch();
    }
  };

  const clickStartTimeHandler = (day: Dayjs) => () => {
    const startDay = day.format('YYYY-MM-DD');
    setStartTime(startDay);
    clickIsShowCalenderHandler(false, false);
  };
  const clickEndTimeHandler = (day: Dayjs) => () => {
    const endDay = day.format('YYYY-MM-DD');
    setEndTime(endDay);
    clickIsShowCalenderHandler(false, false);
  };

  const clickIsShowCalenderHandler = (isStart: boolean, isEnd: boolean) => {
    setIsShowStartCalender(isStart);
    setIsShowEndCalender(isEnd);
  };

  return {
    isDateButton,
    clickFilterButtonHandler,
    clickStartTimeHandler,
    clickEndTimeHandler,
    clickIsShowCalenderHandler,
  };
};

export default useFilterButton;
