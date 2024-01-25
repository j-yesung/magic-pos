import { fetchPlatForm } from '@/server/api/supabase/platform';
import usePlatFormStore, { setFetchPlatFormData } from '@/shared/store/platform';
import { useEffect } from 'react';
import Item from './item/Item';
import styles from './styles/card.module.css';

const Card = () => {
  const {
    addPlatForm: { store_id },
    fetchPlatFormData,
  } = usePlatFormStore();

  const getPlatFormDataFromSupabase = async () => {
    const { platform, error } = await fetchPlatForm(store_id!);
    if (error) throw error;
    return platform;
  };
  useEffect(() => {
    getPlatFormDataFromSupabase().then(result => {
      if (result) {
        setFetchPlatFormData(result);
      }
    });
  }, []);
  return (
    <div className={styles.cardContainer}>
      {fetchPlatFormData &&
        fetchPlatFormData.map(card => {
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

export default Card;
