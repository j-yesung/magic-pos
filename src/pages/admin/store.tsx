import AdminLayout from '@/components/layout/admin/AdminLayout';
import { ReactNode } from 'react';

const StorePage = () => {
  return <div>스토어 페이지</div>;
};

StorePage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default StorePage;
