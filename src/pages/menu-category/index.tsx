import CategoriesComponentPage from '@/components/menu-category/Categories';
import useCategoriesStore from '@/shared/store/menu-category';
import { useEffect } from 'react';
import { fetchCategories } from '../api/menu-category';

interface PropsType {
  data: CategoryType[];
  storeId: string;
}

const CategoryPage = (props: PropsType) => {
  const { data } = props;
  const { storeId } = props;
  const { category, setCategory, setCategories } = useCategoriesStore();

  useEffect(() => {
    setCategories(data);
    setCategory({
      ...category,
      store_id: storeId,
      position: data.length,
    });
  }, [data]);

  return <CategoriesComponentPage />;
};

export default CategoryPage;

export async function getStaticProps() {
  // store_id 임시로
  // TODO:: 나중에 business_id 받는 store api 활용해서 가져오기
  const storeId = '0c4b3064-7983-42a7-9e92-207373b019ad';
  const { data } = await fetchCategories(storeId);

  return {
    props: {
      data,
      storeId,
    },
  };
}
