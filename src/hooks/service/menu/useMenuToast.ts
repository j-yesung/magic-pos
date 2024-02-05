import useToast from '@/hooks/service/ui/useToast';

const useMenuToast = () => {
  const { toast } = useToast();

  const showCompleteToast = (content: string, type: 'success' | 'warn') => {
    toast(content, {
      type: type,
      position: 'top-center',
      showCloseButton: false,
      autoClose: 2000,
    });
  };

  return {
    showCompleteToast,
  };
};

export default useMenuToast;
