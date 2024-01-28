import { create } from 'zustand';

interface ToggleState {
  isChecked: boolean;
  isCheckbox: boolean;
}

const useToggleState = create<ToggleState>(() => ({
  isChecked: true,
  isCheckbox: false,
}));

export const changeToggle = () => useToggleState.setState(state => ({ isChecked: !state.isChecked }));
export const resetToggle = () => useToggleState.setState(() => ({ isChecked: true }));
export const changeCheckBox = () => useToggleState.setState(state => ({ isCheckbox: !state.isCheckbox }));

export default useToggleState;
