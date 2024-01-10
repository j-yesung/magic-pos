import { create } from 'zustand';

interface ToggleState {
  isToggle: boolean;
  changeToggle: () => void;
}

const useToggleStore = create<ToggleState>(set => ({
  isToggle: false,
  changeToggle: () => set(state => ({ isToggle: !state.isToggle })),
}));

export default useToggleStore;
