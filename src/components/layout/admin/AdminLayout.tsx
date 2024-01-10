import Header from '@/components/layout/admin/header/Header';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AdminLayout;
