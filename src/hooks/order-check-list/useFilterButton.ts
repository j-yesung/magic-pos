import useOrderCheckListStore from '@/shared/store/order-check-list';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import useFetchOrderCheckList from './useFetchOrderCheckList';

const useFilterButton = () => {
  const [isDateButton, setIsDateButton] = useState(0);
  const { setListType, setStartTime, setEndTime } = useOrderCheckListStore();
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
  };
  const clickEndTimeHandler = (day: Dayjs) => () => {
    const endDay = day.format('YYYY-MM-DD');
    setEndTime(endDay);
  };

  return { isDateButton, clickFilterButtonHandler, clickStartTimeHandler, clickEndTimeHandler };
};

export default useFilterButton;
