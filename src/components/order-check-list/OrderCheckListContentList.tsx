import useOrderCheckList from '@/hooks/order-check-list/useOrderCheckList';
import useAuthState from '@/shared/store/session';
import { useInView } from 'react-intersection-observer';
import OrderCheckListItem from './OrderCheckListItem';
import styles from './styles/OrderCheckListContentList.module.css';

const OrderCheckListContentList = () => {
  const storeId = useAuthState(state => state.storeId);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useOrderCheckList(storeId!);

  const { ref } = useInView({
    threshold: 1,
    onChange: inView => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });
  return (
    <div className={styles['order-check-list-content-list']}>
      {data?.map((item, index) => <OrderCheckListItem key={item?.id ?? index} orderData={item} />)}
      {/* 인피니티 스크롤을 위한 div */}
      <div ref={ref} className={styles['inView']}></div>
    </div>
  );
};

export default OrderCheckListContentList;
