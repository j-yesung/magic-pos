import CategoryComponentPage from './Category';
import CategoryFormPage from './Form';

const CategoriesComponentPage = () => {
  return (
    <>
      <h2 className="bg-[gold]">카테고리 등록하기</h2>
      <div>
        <CategoryComponentPage />
        <CategoryFormPage />
      </div>
    </>
  );
};

export default CategoriesComponentPage;
