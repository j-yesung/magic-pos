import { useDataHandler } from '@/hooks/service/sales/useDataHandler';
import useDayState from '@/shared/store/sales/salesDay';
import { setIsShow } from '@/shared/store/sales/salesToggle';
import React, { useCallback } from 'react';
import Select, { StylesConfig } from 'react-select';
import styles from './styles/tabButton.module.css';

const TODAY = 'today';
const MONTH = 'month';
const WEEK = 'week';
const SELECT = 'select';

const OPTION_SELECT_TYPE = { value: 'select', label: '날짜 선택' };
const OPTION_TODAY = { value: 'today', label: '오늘' };
const OPTION_WEEK = { value: 'week', label: '이번 주' };
const OPTION_MONTH = { value: 'month', label: '이번 달' };
const OPTIONS = [OPTION_TODAY, OPTION_WEEK, OPTION_MONTH, OPTION_SELECT_TYPE];

const customStyles: StylesConfig<OptionType, false> = {
  control: provided => ({
    ...provided,
    width: '16rem',
    height: '4rem',
    fontWeight: '500',
    fontSize: '1.5rem',
    paddingLeft: '1rem',
    textAlign: 'left',
    color: '#000000',
    background: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.10)',
  }),
  menu: provided => ({
    ...provided,
    width: '16rem',
    fontWeight: '500',
    fontSize: '1.5rem',
    color: '#000000',
    textAlign: 'center',
    borderRadius: '0.5rem',
  }),
};

const TabButton = () => {
  const { clickMoveTodayHandler, clickWeeksChartHandler, clickMonthsChartHandler } = useDataHandler();
  const { selectedDate, today } = useDayState();
  const clickShowCalendarHandler = useCallback(() => {
    setIsShow(true);
  }, []);

  const changeOptionDataHandler = useCallback(
    async (type: string) => {
      if (type === TODAY) await clickMoveTodayHandler();
      if (type === WEEK) await clickWeeksChartHandler();
      if (type === MONTH) await clickMonthsChartHandler();
      if (type === SELECT) clickShowCalendarHandler();
    },
    [clickMonthsChartHandler, clickMoveTodayHandler, clickWeeksChartHandler, clickShowCalendarHandler],
  );

  const SELECT_DAY = {
    value: 'select',
    label: selectedDate.isSame(today, 'year') ? selectedDate.format(' M월 D일') : selectedDate.format('YY년 M월 D일'),
  };

  return (
    <div className={styles.dateWrapper}>
      <Select
        isSearchable={false}
        {...(!selectedDate.isSame(today, 'day') && { value: SELECT_DAY })}
        options={OPTIONS}
        styles={customStyles}
        defaultValue={OPTION_TODAY}
        onChange={async option => await changeOptionDataHandler(option!.value)}
      ></Select>
    </div>
  );
};

export default React.memo(TabButton);
