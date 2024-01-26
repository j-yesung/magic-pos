import { addToastList, setAnimation, subtractToastList } from '@/shared/store/toast';
import { ToastAnimationType, ToastTypeOption } from '@/types/common';
import { nanoid } from 'nanoid';

const ANIMATION_TERM_TIME = 500;

const useToast = () => {
  /**
   * *WARN*: 절대 컴포넌트가 렌더링중에 실행하지 마세요! (useEffect 안이나, 핸들러에서 호출)
   * Toast 알림창을 띄웁니다. 최대한 react-toastify와 비슷하게 만들어보려 했습니다.
   * usage
   * ```
   * const { toast } = useToast();
   * toast('들어갈 내용', {
   *       type: 'info',
   *       position: 'top-right',
   *       showCloseButton: false,
   *       autoClose: 2000,
   *     });
   * ```
   * @param content
   * @param option
   * type: info, success, warn, danger 4가지 타입이 존재합니다. 색상, 아이콘등이 다르게 출력 됩니다.
   * position: top-right, top-left, bottom-right, bottom-left 4가지 위치를 지정할 수 있습니다.
   * TODO: showCloseButton: 해당 toast 닫기 버튼을 클릭합니다.
   * autoClose: 자동으로 닫히는 시간을 설정합니다.
   */
  const toast = (content: string, option: Omit<ToastTypeOption, 'content' | 'id' | 'animation'>) => {
    const toastId = nanoid();
    addToastList({ content, id: toastId, animation: null, ...option });

    let hideAnimationType: ToastAnimationType = 'hide-top-right';

    switch (option.position) {
      case 'top-left':
        hideAnimationType = 'hide-top-left';
        break;
      case 'top-center':
        hideAnimationType = 'hide-top-center';
        break;
      case 'bottom-left':
        hideAnimationType = 'hide-bottom-left';
        break;
      case 'bottom-right':
        hideAnimationType = 'hide-bottom-right';
        break;
    }

    setTimeout(
      () => {
        setAnimation(toastId, hideAnimationType);

        // 애니메이션을 실행하기 위해 CSS를 통해 화면에서 사라지고, 실제로 데이터가 사라지기 사이에 시간을 준다.
        setTimeout(() => {
          setTimeout(() => {
            subtractToastList(toastId);
          }, ANIMATION_TERM_TIME);
        }, ANIMATION_TERM_TIME);
      },
      option.autoClose ?? 2000 - ANIMATION_TERM_TIME,
    );
  };

  return { toast };
};

export default useToast;
