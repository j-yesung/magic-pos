import { create } from 'zustand';

/**
 * 에러 상태를 관리합니다.
 */

interface ErrorState {
  title: string;
  message: string;
  subMessage: string;
  code: number;
  link?: string;
}

const useErrorState = create<ErrorState>()(() => ({
  title: 'ERROR',
  message: '일시적인 오류가 발생했어요',
  subMessage: '잠시 후 다시 시도해 주세요.',
  code: 500,
}));

export const setErrorState = (error: ErrorState) => {
  useErrorState.setState(error);
};

export const setErrorTitle = (title: string) => useErrorState.setState(() => ({ title }));
export const setErrorMessage = (message: string) => useErrorState.setState(() => ({ message }));
export const setErrorSubMessage = (subMessage: string) => useErrorState.setState(() => ({ subMessage }));
export const setErrorLink = (link: string) => useErrorState.setState(() => ({ link }));
export default useErrorState;
