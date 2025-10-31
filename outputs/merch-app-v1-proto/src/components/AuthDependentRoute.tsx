import React from 'react';
import { isEmpty } from 'lodash';
import { Redirect, Route } from 'react-router-dom';
import { DateTime, Duration } from 'luxon';
import { useAuthTokenStore } from '@/features/auth/hooks';
import { useReportsAuthStore } from '@/features/reports-auth/hooks';
import { AuthDependentRouteProps } from './types';

export const AuthDependentRoute: React.FC<AuthDependentRouteProps> = (
  props: AuthDependentRouteProps
) => {
  const { authToken } = useAuthTokenStore();
  const { auth: reportsAuth } = useReportsAuthStore();
  const expiresAt = DateTime.fromISO(
    authToken?.created || reportsAuth?.created || ''
  ).plus(Duration.fromObject({ seconds: authToken?.ttl || reportsAuth?.ttl }));

  const { shouldBeLoggedIn, ...rest } = props;
  const isActive = expiresAt > DateTime.local();

  if (shouldBeLoggedIn && !isActive) {
    return isEmpty(authToken || reportsAuth) ? (
      <Redirect to="/reports/login" />
    ) : (
      <Redirect to="/logout" />
    );
  }

  if (!shouldBeLoggedIn && isActive) {
    return <Redirect to="/reports/home" />;
  }

  return <Route {...rest} />;
};

export default AuthDependentRoute;
