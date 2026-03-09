'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, setUser, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const verifySession = useCallback(async () => {
    try {
      const user = await checkSession();
      if (user) {
        setUser(user);
      } else {
        clearAuth();

        const isPrivate = pathname.startsWith('/profile') || pathname.startsWith('/notes');
        if (isPrivate) {
          router.push('/sign-in');
        }
      }
    } catch {
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router, setUser, clearAuth]);

  useEffect(() => {
    setIsLoading(true);
    verifySession();
  }, [verifySession]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isPrivate = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  if (!isAuthenticated && isPrivate) {
    return null;
  }

  return <>{children}</>;
}
