import { create } from 'zustand';

interface ToggleState {
  isChecked: boolean;
  changeToggle: () => void;
}

const useToggleState = create<ToggleState>(set => ({
  isChecked: true,
  changeToggle: () => set(state => ({ isChecked: !state.isChecked })),
}));

export default useToggleState;
