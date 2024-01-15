import { ToastAnimationType, ToastTypeOption } from '@/types/common';
import useToastStore from '@/shared/store/toast';
import { nanoid } from 'nanoid';

const ANIMATION_TERM_TIME = 500;

const useToast = () => {
  const { addToastList, subtractToastList, setAnimation } = useToastStore();

  const toast = (content: string, option: Omit<ToastTypeOption, 'content' | 'id' | 'animation'>) => {
    const toastId = nanoid();
    addToastList({ content, id: toastId, animation: null, ...option });

    let hideAnimationType: ToastAnimationType = 'hide-top-right';

    switch (option.position) {
      case 'top-left':
        hideAnimationType = 'hide-top-left';
        break;
      case 'bottom-left':
        hideAnimationType = 'hide-bottom-left';
        break;
      case 'bottom-right':
        hideAnimationType = 'hide-bottom-right';
    }

    setTimeout(() => {
      setAnimation(toastId, hideAnimationType);

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
