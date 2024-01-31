import useAuthState from '@/shared/store/session';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayoutWrapper from './AdminLayoutWrapper';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useAuthState(state => state.session);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && !session) router.push('/');
    setIsLoaded(true);
  }, [isLoaded, router, session]);

  return (
    <>
      <style jsx global>{`
        @media only all and (max-width: 1520px) {
          html {
            font-size: 8px;
          }
        }
      `}</style>
      {isLoaded && <AdminLayoutWrapper>{children}</AdminLayoutWrapper>}
    </>
  );
};

export default AdminLayout;
