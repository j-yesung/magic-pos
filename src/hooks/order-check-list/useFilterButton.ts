import useOrderCheckListStore from '@/shared/store/order-check-list';
import { ChangeEvent, useState } from 'react';
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

  const changeStartTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const changeEndTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  return { isDateButton, clickFilterButtonHandler, changeStartTimeHandler, changeEndTimeHandler };
};

export default useFilterButton;
