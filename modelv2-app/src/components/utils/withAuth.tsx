'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component: React.FC) {
  return function AuthComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
      }
    }, []);

    return <Component {...props} />;
  };
}
