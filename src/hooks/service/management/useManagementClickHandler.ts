import { HOME_PATH } from '@/data/url-list';
import useSetManagement from '@/hooks/query/management/useSetManagement';
import useManagementStore from '@/shared/store/management';
import { OrderDataWithStoreName, Tables } from '@/types/supabase';
import { ReactElement } from 'react';
import { useModal } from '../ui/useModal';
import useToast from '../ui/useToast';
import useSendPush from '../useSendPush';

const useManagementClickHandler = () => {
  const { setIsSideBar, setOrderId } = useManagementStore();
  const { MagicModal } = useModal();
  const { toast } = useToast();
  const sendPush = useSendPush();
  const { mutate } = useSetManagement();

  const clickPackagingOrderDataHandler = (packagingId: string) => {
    setOrderId({ id: [packagingId], status: '포장', number: '' });
    setIsSideBar();
  };

  const clickShopIsNotTableOrderDataHandler = (shopDataId: string) => {
    setOrderId({ id: [shopDataId], status: '매장', number: '' });
    setIsSideBar();
  };

  const clickShopOrderDataHandler = (
    storeOrderInTable: Tables<'order_store'>[],
    storeOrderInTableById: string[],
    tablePosition: number,
  ) => {
    if (storeOrderInTable.length === 0) {
      toast('주문내역이 없습니다 ', {
        type: 'danger',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 3000,
      });
    } else {
      setOrderId({ id: storeOrderInTableById, status: '테이블', number: `${tablePosition}` });
      setIsSideBar();
    }
  };

  // side bar
  const clickCloseSideBarHandler = () => {
    setIsSideBar();
  };

  interface userTokenType {
    id: string;
    order_id: string;
    token: string;
  }

  const clickOrderConfirmHandler = (
    ExclamationMark: ReactElement,
    menuName: string,
    otherMenuNum: number,
    orderData: OrderDataWithStoreName,
    userToken?: userTokenType,
  ) => {
    const { id, order_number, is_togo } = orderData;

    MagicModal.confirm({
      icon: ExclamationMark,
      content: '주문을 완료할까요?',
      confirmButtonCallback: () => {
        if (userToken) {
          sendPush({
            title: `${order_number}번 주문이 완료되었습니다.`,
            body: `${menuName} 외 ${otherMenuNum}개`,
            token: userToken?.token || '',
            click_action: HOME_PATH,
          });
        } else {
          toast('토큰을 발급받을 수 없습니다. 관리자에게 문의해주세요', {
            type: 'danger',
            position: 'top-right',
          });
          toast(`${order_number}번 주문이 고객에게 알림이 가지 않았습니다.`, {
            type: 'warn',
            position: 'top-right',
          });
        }

        if (typeof is_togo === 'undefined') {
          mutate({ id: id, isTogo: false });
        } else if (typeof is_togo === 'boolean') {
          mutate({ id: id, isTogo: true });
        }
      },
    });
  };

  return {
    clickPackagingOrderDataHandler,
    clickShopIsNotTableOrderDataHandler,
    clickShopOrderDataHandler,
    clickCloseSideBarHandler,
    clickOrderConfirmHandler,
  };
};

export default useManagementClickHandler;
