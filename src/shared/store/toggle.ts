import { create } from 'zustand';

interface ToggleState {
  isChecked: boolean;
}

const useToggleState = create<ToggleState>(() => ({
  isChecked: true,
}));

export const changeToggle = () => useToggleState.setState(state => ({ isChecked: !state.isChecked }));
export const resetToggle = () => useToggleState.setState(() => ({ isChecked: true }));

export default useToggleState;
