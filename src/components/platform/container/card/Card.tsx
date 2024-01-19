import { Tables } from '@/types/supabase';
import { EditFormType } from '../PlatFormWrapper';
import Item from './item/Item';
import styles from './styles/card.module.css';

interface CardPropsType {
  fetchDataList: Tables<'platform'>[];
  isEdit: boolean;
  setEditTarget: React.Dispatch<React.SetStateAction<EditFormType>>;
  setIsShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPreImage: React.Dispatch<React.SetStateAction<string | null>>;
}
const Card = ({ fetchDataList, isEdit, setEditTarget, setIsShowEditForm, setPreImage }: CardPropsType) => {
  return (
    <div className={styles.cardContainer}>
      {fetchDataList &&
        fetchDataList.map((card, idx) => {
          return (
            <Item
              key={`${card.link_url! + card.name + idx}`}
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
