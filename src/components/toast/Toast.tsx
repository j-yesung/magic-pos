import useToastState from '@/shared/store/toast';
import ToastContent from '@/components/toast/ToastContent';

const Toast = () => {
  const toastList = useToastState(state => state.toastList);

  // Toast의 옵션마다 다른 위치에 렌더링 시켜야 한다.
  const topRightList = toastList.filter(toast => toast.position === 'top-right');
  const topCenterList = toastList.filter(toast => toast.position === 'top-center');
  const topLeftList = toastList.filter(toast => toast.position === 'top-left');
  const bottomRightList = toastList.filter(toast => toast.position === 'bottom-right');
  const bottomLeftList = toastList.filter(toast => toast.position === 'bottom-left');

  return (
    <>
      {topRightList.length > 0 && <ToastContent list={topRightList} position="top-right" />}
      {topCenterList.length > 0 && <ToastContent list={topCenterList} position="top-center" />}
      {topLeftList.length > 0 && <ToastContent list={topLeftList} position="top-left" />}
      {bottomRightList.length > 0 && <ToastContent list={bottomRightList} position="bottom-right" />}
      {bottomLeftList.length > 0 && <ToastContent list={bottomLeftList} position="bottom-left" />}
    </>
  );
};

export default Toast;
