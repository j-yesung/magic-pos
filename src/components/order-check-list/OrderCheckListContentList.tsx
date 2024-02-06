import useFetchOrderCheckList from '@/hooks/query/order-check-list/useFetchOrderCheckList';
import { useInView } from 'react-intersection-observer';
import OrderCheckListItem from './OrderCheckListItem';
import styles from './styles/OrderCheckListContentList.module.css';

const OrderCheckListContentList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchOrderCheckList();

  const { ref } = useInView({
    threshold: 0.5,
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
