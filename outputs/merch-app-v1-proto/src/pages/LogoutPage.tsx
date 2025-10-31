import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useAuthTokenStore } from '@/features/auth/hooks';
import { useReportsAuthStore } from '@/features/reports-auth/hooks';

const LogoutPage: React.FC = () => {
  const { authToken: auth, clearToken } = useAuthTokenStore();
  const { auth: reportsAuth, logout } = useReportsAuthStore();

  useEffect(() => {
    clearToken();
    logout();
  }, [auth, reportsAuth]);

  return (
    <>
      {isEmpty(auth) && isEmpty(reportsAuth) && (
        <Redirect to="/reports/login" />
      )}
    </>
  );
};

export default LogoutPage;
