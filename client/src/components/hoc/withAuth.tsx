'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>, allowedRoles: string[] = []) => {
  const ComponentWithAuth = (props: P) => {
    const { user, token, hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (hasHydrated && (!user || !token)) {
        router.push('/auth/login');
      }

      if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push('/unauthorized');
      }
    }, [user, token, hasHydrated]);

    if (!hasHydrated) return null;
    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};
