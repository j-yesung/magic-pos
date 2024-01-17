import { create } from 'zustand';

interface SideBarState {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (value: boolean) => void;
  toggleIsSideBarOpen: () => void;
}

const useSideBarState = create<SideBarState>(set => ({
  isSideBarOpen: false,
  setIsSideBarOpen: value => set(() => ({ isSideBarOpen: value })),
  toggleIsSideBarOpen: () => set(state => ({ isSideBarOpen: !state.isSideBarOpen })),
}));

export default useSideBarState;
