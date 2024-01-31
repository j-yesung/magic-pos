import { Tables } from '@/types/supabase';
import { create } from 'zustand';

interface SalesExcel {
  allStoreSales: Tables<'sales'>[];
  allTakeOutSales: Tables<'sales'>[];
}

const initialAllStoreSales: Tables<'sales'>[] = [];
const initialAllTakeOutSales: Tables<'sales'>[] = [];

const useSalesExcel = create<SalesExcel>()(() => ({
  allStoreSales: initialAllStoreSales,
  allTakeOutSales: initialAllTakeOutSales,
}));

export default useSalesExcel;

export const setAllStoreSales = (data: Tables<'sales'>[]) =>
  useSalesExcel.setState(state => ({
    ...state,
    allStoreSales: data,
  }));

export const setAllTakeOutSales = (data: Tables<'sales'>[]) =>
  useSalesExcel.setState(state => ({
    ...state,
    allTakeOutSales: data,
  }));

export const resetUseSalesExcel = () =>
  useSalesExcel.setState(() => ({
    allStoreSales: initialAllStoreSales,
    allTakeOutSales: initialAllTakeOutSales,
  }));
