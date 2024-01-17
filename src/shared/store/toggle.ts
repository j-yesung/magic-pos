import { create } from 'zustand';

interface ToggleState {
  isChecked: boolean;
  changeToggle: () => void;
  resetToggle: () => void;
}

const useToggleState = create<ToggleState>(set => ({
  isChecked: true,
  changeToggle: () => set(state => ({ isChecked: !state.isChecked })),
  resetToggle: () => set(() => ({ isChecked: true })),
}));

export default useToggleState;
