import { create } from 'zustand';

interface ToggleState {
  isChecked: boolean;
  changeToggle: () => void;
}

const useToggleStore = create<ToggleState>(set => ({
  isChecked: true,
  changeToggle: () => set(state => ({ isChecked: !state.isChecked })),
}));

export default useToggleStore;
