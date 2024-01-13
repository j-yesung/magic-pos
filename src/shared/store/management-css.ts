import { RefObject } from 'react';
import { create } from 'zustand';


type ClickMenuListType = {
  itemOrderListRef: RefObject<HTMLUListElement> | null
  itemOrderListItemRef: RefObject<HTMLLIElement[]> | null
  itemOrderListItemImageRef: RefObject<HTMLSpanElement[]> | null
  itemOrderListItemNameRef: RefObject<HTMLSpanElement[]> | null
  itemOrderListItemPriceRef: RefObject<HTMLSpanElement[]> | null
}

interface ManagementCssType {
  refItemOrderList: RefObject<HTMLUListElement> | null;
  refItemOrderListItem: RefObject<HTMLLIElement[]> | null;
  refItemOrderListItemImage: RefObject<HTMLSpanElement[]> | null;
  refItemOrderListItemName: RefObject<HTMLSpanElement[]> | null;
  refItemOrderListItemPrice: RefObject<HTMLSpanElement[]> | null;
  setClickMenuList: (value: ClickMenuListType) => void
}

const useManagementCssStore = create<ManagementCssType>(set => ({
  // state영역
  refItemOrderList: null,
  refItemOrderListItem: null,
  refItemOrderListItemImage: null,
  refItemOrderListItemName: null,
  refItemOrderListItemPrice: null,
  // setState함수 영역
  setClickMenuList: (value) => set(state => ({
    ...state,
    refItemOrderList: value.itemOrderListRef,
    refItemOrderListItem: value.itemOrderListItemRef,
    refItemOrderListItemImage: value.itemOrderListItemImageRef,
    refItemOrderListItemName: value.itemOrderListItemNameRef,
    refItemOrderListItemPrice: value.itemOrderListItemPriceRef
  }))
}))

export default useManagementCssStore
