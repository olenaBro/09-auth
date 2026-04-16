'use client';

import { useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../lib/store/authStore';
import { checkSession, getMe, logout } from '../../lib/api/clientApi';

interface AuthProviderProps {
  children: ReactNode;
}

const privatePaths = ['/notes', '/profile'];

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const isPrivate = privatePaths.some(path => pathname.startsWith(path));

  useEffect(() => {
    const verify = async () => {
      try {
        const session = await checkSession();
        if (session) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
          if (isPrivate) {
            await logout();
          }
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [pathname, setUser, clearIsAuthenticated, isPrivate]);

  if (isLoading && isPrivate) {
    return <p>Loading, please wait...</p>;
  }

  if (isPrivate && !isAuthenticated && !isLoading) {
    return null;
  }

  return <>{children}</>;
}
