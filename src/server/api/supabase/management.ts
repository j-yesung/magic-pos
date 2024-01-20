import { supabase } from '@/shared/supabase';
import { OrderConfirmType, ToastTypeOption } from '@/types/common';
import { StoreWithOrderInfo } from '@/types/supabase';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';



export const fetchManagement = async (id?: string) => {
  if (id) {
    const { data: store, error } = await supabase.from('store')
      .select('*, store_table(*),order_store(*),order_number(*)')
      .eq('business_id', id)
      .eq('order_store.is_done', false)
      .eq('order_number.is_done', false)
    if (error) throw new Error(error.message);
    return store;
  }
};

export const updateIsDone = async (orderData: OrderConfirmType[]) => {
  for (let i = 0; i < orderData.length; i++) {
    const { error } = await supabase
      .from(`${orderData[i].isTogo ? 'order_number' : 'order_store'}`)
      .update({ is_done: true })
      .eq('id', orderData[i].id)
      .select()
    if (error) throw new Error(error.message);
  }
}






export const submitDetectedOrder = (
  storeId: string,
  refetch: (options?: RefetchOptions | undefined) =>
    Promise<QueryObserverResult<StoreWithOrderInfo[] | undefined, Error>>,
  toast: (content: string, option: Omit<ToastTypeOption, "id" | "content" | "animation">) => void,
) => {
  supabase
    .channel('order_store')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'order_store', filter: `store_id=eq.${storeId}` },
      payload => {
        console.log(payload)
        payloadFunction(payload.new.order_number, toast, refetch)
      },
    )
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'order_number', filter: `store_id=eq.${storeId}` },
      payload => {
        console.log(payload)
        payloadFunction(payload.new.order_number, toast, refetch)
      })
    .subscribe();
};


// realTime에 payload함수에서 사용하는 함수
const payloadFunction = (
  orderNumber: number,
  toast: (content: string, option: Omit<ToastTypeOption, "id" | "content" | "animation">) => void,
  refetch: (options?: RefetchOptions | undefined) =>
    Promise<QueryObserverResult<StoreWithOrderInfo[] | undefined, Error>>,
) => {
  // toast모달창
  toast(`주문번호${orderNumber}번이 요청되었습니다.`, {
    type: 'info',
    position: 'top-right',
    showCloseButton: false,
    autoClose: 5000,
  });

  // TTS 음성알림
  const synth = window.speechSynthesis
  const text = `주문번호 ${orderNumber} .번 주문이 요청되었습니다`
  const utterThis = new SpeechSynthesisUtterance(text)
  utterThis.lang = "ko-KR";
  utterThis.rate = 1.6;
  synth.speak(utterThis)

  // 주문현황 refetch
  refetch();

  // notification 알림창
  const notification = new Notification(`주문번호${orderNumber}`, {
    icon: '',
    body: `주문번호${orderNumber}번이 요청되었습니다.`,
  });
  notification.onclick = () => {
    window.open(`${process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO}/admin/management`);
  };
}