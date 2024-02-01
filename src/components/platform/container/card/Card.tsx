import usePlatFormQuery from '@/hooks/query/platform/useFetchQuery';
import usePlatFormState from '@/shared/store/platform';
import useAuthState from '@/shared/store/session';
import Item from './item/Item';
import styles from './styles/card.module.css';

const Card = () => {
  const {
    addPlatForm: { store_id },
    fetchPlatFormData,
  } = usePlatFormState();
  const storeId = useAuthState(state => state.storeId);
  const { data, isLoading } = usePlatFormQuery({ storeId: storeId! });
  console.log(data, 'data');
  console.log(isLoading);
  // const getPlatFormDataFromSupabase = async () => {
  //   const { platform, error } = await fetchPlatForm(store_id!);
  //   if (error) throw error;
  //   return platform;
  // };
  // useEffect(() => {
  //   getPlatFormDataFromSupabase().then(result => {
  //     if (result) {
  //       setFetchPlatFormData(result);
  //     }
  //   });
  // }, []);
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

export default Card;
