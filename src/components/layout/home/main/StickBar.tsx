import { HOME_PATH } from '@/data/url-list';
import { useAuthSetQuery } from '@/hooks/query/auth/useAuthSetQuery';
import useAuthState from '@/shared/store/session';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/StickBar.module.css';
import ScrollTop from './ScrollTop';
import Logo from '/public/logo.svg';

const StickBar = () => {
  const router = useRouter();
  const { logout } = useAuthSetQuery();
  const session = useAuthState(state => state.session);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <div className={styles.wrapper}>
          <Logo width={200} height={23} onClick={() => router.push(HOME_PATH)} />
          <div className={styles.tabArea}>
            <div>
              {session === null ? (
                <>
                  <Link href="/auth/signup">회원가입</Link>
                  <Link href="/auth/login">로그인</Link>
                </>
              ) : (
                <Link href="/" onClick={() => logout()}>
                  로그아웃
                </Link>
              )}
            </div>
            <ScrollTop />
          </div>
        </div>
      )}
    </>
  );
};

export default StickBar;
