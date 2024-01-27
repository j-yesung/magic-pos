import useAuthState from '@/shared/store/session';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayoutWrapper from './AdminLayoutWrapper';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useAuthState(state => state.session);
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push('/');
  }, [router, session]);

  return (
    <>
      <style jsx global>{`
        @media only all and (max-width: 1520px) {
          html {
            font-size: 8px;
          }
        }
      `}</style>
      <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
    </>
  );
};

export default AdminLayout;
