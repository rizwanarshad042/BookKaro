import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(sessionStorage.getItem('token')));

  useEffect(() => {
    const update = () => setIsAuthenticated(Boolean(sessionStorage.getItem('token')));
    window.addEventListener('userStatusChanged', update);
    return () => window.removeEventListener('userStatusChanged', update);
  }, []);

  return { isAuthenticated };
};
