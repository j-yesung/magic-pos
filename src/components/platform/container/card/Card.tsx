import usePlatFormQuery from '@/hooks/query/platform/useFetchQuery';
import useAuthState from '@/shared/store/session';
import React from 'react';
import Item from './item/Item';
import styles from './styles/card.module.css';

const Card = () => {
  const storeId = useAuthState(state => state.storeId);
  const { data } = usePlatFormQuery({ storeId: storeId! });

  return (
    <div className={styles.cardContainer}>
      {data &&
        data.platform.map(card => {
          return (
            <Item
              key={`${card.created_at + card.name}`}
              link={card.link_url!}
              title={card.name!}
              id={card.id}
              imgUrl={card.image_url}
            />
          );
        })}
    </div>
  );
};

export default React.memo(Card);
