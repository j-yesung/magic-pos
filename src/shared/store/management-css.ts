import { RefObject } from 'react';
import { create } from 'zustand';


type ClickMenuListType = {
  itemOrderListRef: RefObject<HTMLUListElement> | null
  itemOrderListItemRef: RefObject<HTMLLIElement[]> | null
  itemOrderListItemSpanRef: RefObject<HTMLSpanElement[]> | null
}

interface ManagementCssType {
  refItemOrderList: RefObject<HTMLUListElement> | null;
  refItemOrderListItem: RefObject<HTMLLIElement[]> | null;
  refItemOrderListItemSpan: RefObject<HTMLSpanElement[]> | null;
    setClickMenuList: (value: ClickMenuListType) => void
}

const useManagementCssStore = create<ManagementCssType>(set => ({
  // state영역
  refItemOrderList: null,
  refItemOrderListItem: null,
  refItemOrderListItemSpan: null,
  // setState함수 영역
  setClickMenuList : (value) => set(state=>({
    ...state,
    refItemOrderList: value.itemOrderListRef,
    refItemOrderListItem:value.itemOrderListItemRef,
    refItemOrderListItemSpan: value.itemOrderListItemSpanRef
  }))
}))

export default useManagementCssStore
