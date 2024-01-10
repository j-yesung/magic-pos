import AdminLayout from '@/components/layout/admin/AdminLayout';
import { ReactNode } from 'react';

const ManagementPage = () => {
  return <div>테이블 관리 페이지입니다.</div>;
};

ManagementPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ManagementPage;
