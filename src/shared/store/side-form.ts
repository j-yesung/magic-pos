import { create } from 'zustand';

interface SideFormState {
  isSideFormOpen: boolean;
  setIsSideFormOpen: (value: boolean) => void;
}

const useSideFormState = create<SideFormState>(set => ({
  isSideFormOpen: false,
  setIsSideFormOpen: value => set(() => ({ isSideFormOpen: value })),
}));

export default useSideFormState;
