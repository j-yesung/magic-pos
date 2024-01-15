import { ToastTypeOption } from '@/types/common';
import useToastStore from '@/shared/store/toast';
import { nanoid } from 'nanoid';

const ANIMATION_TERM_TIME = 1000;

const useToast = () => {
  const { addToastList, subtractToastList, setAnimation, setAllAnimationNull } = useToastStore();

  const toast = (content: string, option: Omit<ToastTypeOption, 'content' | 'id' | 'animation'>) => {
    const toastId = nanoid();
    addToastList({ content, id: toastId, animation: null, ...option });

    setTimeout(() => {
      setAnimation(toastId, 'hide-right');

      setTimeout(() => {
        setTimeout(() => {
          subtractToastList(toastId);
        }, ANIMATION_TERM_TIME);
      }, ANIMATION_TERM_TIME);
    }, option.autoClose - ANIMATION_TERM_TIME);
  };

  return { toast };
};

export default useToast;
