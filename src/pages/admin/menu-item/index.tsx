import AdminLayout from '@/components/layout/admin/AdminLayout';
import MenuItemsComponentPage from '@/components/menu-item/MenuItemContainer';
import { ReactNode } from 'react';

const ItemPage = () => {
  return <MenuItemsComponentPage />;
};

ItemPage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ItemPage;
