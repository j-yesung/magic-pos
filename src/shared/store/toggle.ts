import { create } from 'zustand';

interface ToggleState {
  isToggle: boolean;
  changeToggle: () => void;
}

const useToggleStore = create<ToggleState>(set => ({
  isToggle: true,
  changeToggle: () => set(state => ({ isToggle: !state.isToggle })),
}));

export default useToggleStore;
