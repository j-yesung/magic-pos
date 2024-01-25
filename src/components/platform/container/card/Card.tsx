import { fetchPlatForm } from '@/server/api/supabase/platform';
import usePlatFormStore, { setFetchPlatFormData } from '@/shared/store/platform';
import { useEffect } from 'react';
import { EditFormType } from '../PlatFormWrapper';
import Item from './item/Item';
import styles from './styles/card.module.css';

interface CardPropsType {
  isEdit: boolean;
  setEditTarget: React.Dispatch<React.SetStateAction<EditFormType>>;
  setIsShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPreImage: React.Dispatch<React.SetStateAction<string | null>>;
}
const Card = ({ isEdit, setEditTarget, setIsShowEditForm, setPreImage }: CardPropsType) => {
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
              isEdit={isEdit}
              id={card.id}
              imgUrl={card.image_url}
              setEditTarget={setEditTarget}
              setIsShowEditForm={setIsShowEditForm}
              setPreImage={setPreImage}
            />
          );
        })}
    </div>
  );
};

export default Card;
