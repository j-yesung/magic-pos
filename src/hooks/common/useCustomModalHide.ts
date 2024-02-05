import { useModal } from '../service/ui/useModal';

const useCustomModalHide = () => {
  const { MagicModal } = useModal();

  const clickModalCloseHandler = (modalId?: string) => {
    MagicModal.hide(modalId ?? '');
  };

  return { clickModalCloseHandler };
};

export default useCustomModalHide;
