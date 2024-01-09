import CategoriesComponentPage from '@/components/menu-category/Categories';
import { fetchCategories } from '../api/menu-category';

const CategoryPage = (props: { data: CategoryType[] }) => {
  const { data } = props;

  return <CategoriesComponentPage data={data} />;
};

export default CategoryPage;

export async function getStaticProps() {
  const { data } = await fetchCategories();
  return {
    props: {
      data,
    },
    // revalidate: 60,
  };
}
