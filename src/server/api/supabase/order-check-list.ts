import { dayJsToString } from '@/components/sales/calendarUtility/dateCalculator';
import { supabase } from '@/shared/supabase';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const fetchOrderCheckList = async (
  pageParam: number,
  id: string,
  listType?: string,
  startDate?: string,
  endDate?: string,
) => {
  switch (listType) {
    case 'day':
      return await fetchDayOrderData(pageParam, id);
      break;
    case 'week':
      return await fetchWeekOrderData(pageParam, id);
      break;
    case 'month':
      return await fetchMonthOrderData(pageParam, id);
      break;
    case 'selectDate':
      return await fetchSelectDateOrderData(pageParam, id, startDate!, endDate!);
      break;
    default:
      return await fetchDefaultOrderData(pageParam, id);
      break;
  }
};

//
//
//
//
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const TIME_FORMAT_MONTH = 'YYYY-MM-01 HH:mm:ss';

// 오늘
const fetchDayOrderData = async (pageParam: number, id: string) => {
  const todayStart = dayJsToString(dayjs(dayjs().format('YYYY-MM-DD 00:00:00')).utc(), TIME_FORMAT);
  const { data: order_store, error: storeError } = await supabase
    .from('order_store')
    .select('*')
    .eq('store_id', id)
    .gte('order_time', todayStart)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  const { data: order_number, error: numberError } = await supabase
    .from('order_number')
    .select('*')
    .eq('store_id', id)
    .gte('order_time', todayStart)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  if (storeError) throw new Error(storeError.message);
  if (numberError) throw new Error(numberError.message);
  const resultData = [...order_store, ...order_number]
    .sort((a, b) => (a && b && a.order_time < b.order_time ? 1 : -1))
    .sort((a, b) => (a && b && a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));

  return resultData;
};

// 이번 주
const fetchWeekOrderData = async (pageParam: number, id: string) => {
  const dayOfTheWeek = dayjs().day(); // 현재 요일
  const weekStart = dayJsToString(
    dayjs(dayjs().format('YYYY-MM-DD 00:00:00')).subtract(dayOfTheWeek, 'day').utc(),
    TIME_FORMAT,
  );
  const { data: order_store, error: storeError } = await supabase
    .from('order_store')
    .select('*')
    .eq('store_id', id)
    .gte('order_time', weekStart)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  const { data: order_number, error: numberError } = await supabase
    .from('order_number')
    .select('*')
    .eq('store_id', id)
    .gte('order_time', weekStart)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  if (storeError) throw new Error(storeError.message);
  if (numberError) throw new Error(numberError.message);
  const resultData = [...order_store, ...order_number]
    .sort((a, b) => (a && b && a.order_time < b.order_time ? 1 : -1))
    .sort((a, b) => (a && b && a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));

  return resultData;
};

// 이번달
const fetchMonthOrderData = async (pageParam: number, id: string) => {
  const monthStart = dayJsToString(dayjs(dayjs().format('YYYY-MM-DD 00:00:00')).utc(), TIME_FORMAT_MONTH);

  const { data: order_store, error: storeError } = await supabase
    .from('order_store')
    .select('*')
    .eq('store_id', id)
    .gte('order_time', monthStart)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  const { data: order_number, error: numberError } = await supabase
    .from('order_number')
    .select('*')
    .eq('store_id', id)
    .gte('order_time', monthStart)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  if (storeError) throw new Error(storeError.message);
  if (numberError) throw new Error(numberError.message);
  const resultData = [...order_store, ...order_number]
    .sort((a, b) => (a && b && a.order_time < b.order_time ? 1 : -1))
    .sort((a, b) => (a && b && a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));

  return resultData;
};

// 날짜선택
const fetchSelectDateOrderData = async (pageParam: number, id: string, startDate: string, endDate: string) => {
  const startSelectDate = dayJsToString(dayjs(dayjs().format(`${startDate} 00:00:00`)).utc(), TIME_FORMAT);
  const endSelectDate = dayJsToString(
    dayjs(dayjs().format(`${endDate} 00:00:00`))
      .add(1, 'day')
      .utc(),
    TIME_FORMAT,
  );
  const { data: order_store, error: storeError } = await supabase
    .from('order_store')
    .select('*')
    .eq('store_id', id)
    .gte('order_time', startSelectDate)
    .lt('order_time', endSelectDate)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  const { data: order_number, error: numberError } = await supabase
    .from('order_number')
    .select('*')
    .eq('store_id', id)
    .gte('order_time', startSelectDate)
    .lt('order_time', endSelectDate)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  if (storeError) throw new Error(storeError.message);
  if (numberError) throw new Error(numberError.message);
  const resultData = [...order_store, ...order_number]
    .sort((a, b) => (a && b && a.order_time < b.order_time ? 1 : -1))
    .sort((a, b) => (a && b && a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));

  return resultData;
};

// default
const fetchDefaultOrderData = async (pageParam: number, id: string) => {
  const { data: order_store, error: storeError } = await supabase
    .from('order_store')
    .select('*')
    .eq('store_id', id)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  const { data: order_number, error: numberError } = await supabase
    .from('order_number')
    .select('*')
    .eq('store_id', id)
    .order('order_time', { ascending: false })
    .range(pageParam * 5, pageParam * 5 + 4);

  if (storeError) throw new Error(storeError.message);
  if (numberError) throw new Error(numberError.message);
  const resultData = [...order_store, ...order_number]
    .sort((a, b) => (a && b && a.order_time < b.order_time ? 1 : -1))
    .sort((a, b) => (a && b && a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));

  return resultData;
};
