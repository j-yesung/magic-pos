import { create } from 'zustand';

interface SideBarState {
  isSideBarOpen: boolean;
}

const useSideBarState = create<SideBarState>(() => ({
  isSideBarOpen: false,
}));

export const setIsSideBarOpen = (value: boolean) => useSideBarState.setState(() => ({ isSideBarOpen: value }));
export const toggleIsSideBarOpen = () => useSideBarState.setState(state => ({ isSideBarOpen: !state.isSideBarOpen }));

export default useSideBarState;
